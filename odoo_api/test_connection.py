#!/usr/bin/env python3
"""
Test script to diagnose Odoo XML-RPC connection issues
"""

import sys
import os
sys.path.append(os.path.dirname(__file__))

from odoo_client import OdooClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get Odoo configuration from environment variables
ODOO_URL = os.getenv('ODOO_URL')
ODOO_DB = os.getenv('ODOO_DB')
ODOO_USER = os.getenv('ODOO_USER')
ODOO_PASSWORD = os.getenv('ODOO_PASSWORD')

# Validate that all required environment variables are set
if not all([ODOO_URL, ODOO_DB, ODOO_USER, ODOO_PASSWORD]):
    print("❌ Missing required environment variables. Please check your .env file.")
    sys.exit(1)

def test_connection():
    print("Testing Odoo XML-RPC connection...")
    print(f"URL: {ODOO_URL}")
    print(f"Database: {ODOO_DB}")
    print(f"User: {ODOO_USER}")
    print("-" * 50)
    
    try:
        # Create client instance
        odoo = OdooClient(
            url=ODOO_URL,
            db=ODOO_DB,
            username=ODOO_USER,
            password=ODOO_PASSWORD
        )
        
        print("✅ Connection successful!")
        print(f"User ID: {odoo.uid}")
        
        # Test a simple operation
        try:
            count = odoo.search_count("res.partner")
            print(f"✅ Test query successful! Found {count} partners")
        except Exception as e:
            print(f"❌ Test query failed: {e}")
            
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False
    
    return True

if __name__ == "__main__":
    success = test_connection()
    sys.exit(0 if success else 1)