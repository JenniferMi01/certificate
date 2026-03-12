import xmlrpc.client
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class OdooClient:
    def __init__(self, url, db, username, password):
        self.url = url
        self.db = db
        self.username = username
        self.password = password
        
        # Authenticate once and store UID
        self._authenticate()

    def _authenticate(self):
        """Authenticate and get UID"""
        try:
            logger.info(f"Connecting to Odoo server: {self.url}")
            common = xmlrpc.client.ServerProxy(f"{self.url}/xmlrpc/2/common")
            
            version_info = common.version()
            logger.info(f"Odoo server version: {version_info}")
            
            self.uid = common.authenticate(self.db, self.username, self.password, {})
            
            if not self.uid:
                raise Exception("Odoo authentication failed: Invalid credentials or user not found")
            
            logger.info(f"Authentication successful. UID: {self.uid}")
            
        except xmlrpc.client.ProtocolError as e:
            logger.error(f"Protocol Error: {e}")
            if e.errcode == 403:
                raise Exception("403 Forbidden: Check if the Odoo server allows XML-RPC connections")
            elif e.errcode == 404:
                raise Exception("404 Not Found: Check if the Odoo server URL is correct")
            else:
                raise Exception(f"HTTP Error {e.errcode}: {e.errmsg}")
        except xmlrpc.client.Fault as e:
            logger.error(f"XML-RPC Fault: {e}")
            raise Exception(f"Odoo Server Error: {e.faultString}")
        except Exception as e:
            logger.error(f"Authentication failed: {e}")
            raise Exception(f"Connection failed: {str(e)}")

    def _get_models(self):
        """Create a fresh models proxy for each request"""
        return xmlrpc.client.ServerProxy(f"{self.url}/xmlrpc/2/object")

    def search_read(self, model, domain=None, fields=None, limit=None, retry=2):
        domain = domain or []
        fields = fields or []

        params = {'fields': fields}
        if limit is not None:
            params['limit'] = limit

        last_error = None
        for attempt in range(retry):
            try:
                models = self._get_models()
                result = models.execute_kw(
                    self.db,
                    self.uid,
                    self.password,
                    model,
                    'search_read',
                    [domain],
                    params
                )
                return result
            except xmlrpc.client.Fault as e:
                error_msg = str(e.faultString)
                # Check for connection errors that warrant a retry
                if "Request-sent" in error_msg or "Idle" in error_msg or "Connection" in error_msg:
                    logger.warning(f"Connection error (attempt {attempt + 1}/{retry}): {error_msg}")
                    last_error = error_msg
                    # Re-authenticate on retry
                    try:
                        self._authenticate()
                    except:
                        pass
                    continue
                logger.error(f"XML-RPC Fault in search_read: {e}")
                raise Exception(f"Odoo Server Error: {error_msg}")
            except Exception as e:
                error_msg = str(e)
                if "Request-sent" in error_msg or "Idle" in error_msg:
                    logger.warning(f"Connection error (attempt {attempt + 1}/{retry}): {error_msg}")
                    last_error = error_msg
                    try:
                        self._authenticate()
                    except:
                        pass
                    continue
                logger.error(f"Error in search_read: {e}")
                raise Exception(f"Search failed: {error_msg}")
        
        raise Exception(f"Search failed after {retry} attempts: {last_error}")

    def search_count(self, model, domain=None):
        domain = domain or []
        
        try:
            models = self._get_models()
            result = models.execute_kw(
                self.db,
                self.uid,
                self.password,
                model,
                'search_count',
                [domain]
            )
            return result
        except xmlrpc.client.Fault as e:
            logger.error(f"XML-RPC Fault in search_count: {e}")
            raise Exception(f"Odoo Server Error: {e.faultString}")
        except Exception as e:
            logger.error(f"Error in search_count: {e}")
            raise Exception(f"Count failed: {str(e)}")
