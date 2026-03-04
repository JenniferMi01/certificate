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

        try:
            # Test connection to common endpoint first
            logger.info(f"Connecting to Odoo server: {url}")
            self.common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
            
            # Get server version info
            try:
                version_info = self.common.version()
                logger.info(f"Odoo server version: {version_info}")
            except Exception as e:
                logger.warning(f"Could not retrieve server version: {e}")
            
            # Attempt authentication
            logger.info(f"Authenticating user: {username}")
            self.uid = self.common.authenticate(db, username, password, {})
            
            if not self.uid:
                raise Exception("Odoo authentication failed: Invalid credentials or user not found")
            
            logger.info(f"Authentication successful. UID: {self.uid}")
            
            self.models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")

        except xmlrpc.client.ProtocolError as e:
            logger.error(f"Protocol Error: {e}")
            if e.errcode == 403:
                raise Exception("403 Forbidden: Check if the Odoo server allows XML-RPC connections and if the credentials are correct")
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

    def search_read(self, model, domain=None, fields=None, limit=None):
        domain = domain or []
        fields = fields or []

        params = {'fields': fields}
        if limit is not None:
            params['limit'] = limit

        try:
            result = self.models.execute_kw(
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
            logger.error(f"XML-RPC Fault in search_read: {e}")
            raise Exception(f"Odoo Server Error: {e.faultString}")
        except Exception as e:
            logger.error(f"Error in search_read: {e}")
            raise Exception(f"Search failed: {str(e)}")

    def search_count(self, model, domain=None):
        domain = domain or []
        try:
            result = self.models.execute_kw(
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