from fastapi import FastAPI, HTTPException, Query
from odoo_client import OdooClient
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import asyncio

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Odoo 10 API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Odoo configuration from environment variables
ODOO_URL = os.getenv('ODOO_URL')
ODOO_DB = os.getenv('ODOO_DB')
ODOO_USER = os.getenv('ODOO_USER')
ODOO_PASSWORD = os.getenv('ODOO_PASSWORD')

# Validate that all required environment variables are set
if not all([ODOO_URL, ODOO_DB, ODOO_USER, ODOO_PASSWORD]):
    raise ValueError("Missing required environment variables. Please check your .env file.")

odoo = OdooClient(
    url=ODOO_URL,
    db=ODOO_DB,
    username=ODOO_USER,
    password=ODOO_PASSWORD
)

@app.get("/partners")
async def get_partners():
    try:
        partners = await asyncio.to_thread(odoo.search_read,
            model="res.partner",
            fields=["id", "name", "email", "phone"],
            limit=50
        )
        return {
            "count": len(partners),
            "data": partners
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/employees/search")
async def search_employee(
    number: str | None = Query(None, description="Employee number to search for"),
    name: str | None = Query(None, description="Employee name to search for")
):
    """Search for an employee by number or name"""
    try:
        if not number and not name:
            raise HTTPException(
                status_code=400, 
                detail="Either 'number' or 'name' parameter must be provided"
            )

        domain = []
        if number:
            domain.append(("number", "=", number))
        if name:
            domain.append(("name", "ilike", name))

        employees = await asyncio.to_thread(odoo.search_read,
            model="hr.employee",
            domain=domain,
            fields=[
                "id",
                "name",
                "number",
                "work_email",
                "work_phone",
                "job_title",
                "department_id",
                "is_active",
                "identification_id",
                "date_delivrance_cin",
                "lieu_delivrance_cin",
            ],
            limit=10
        )

        if not employees:
            raise HTTPException(status_code=404, detail="No employees found")

        # Format department_id (many2one)
        for emp in employees:
            if emp.get("department_id"):
                emp["department"] = {
                    "name": emp["department_id"][1]
                }
            emp.pop("department_id", None)

        return {
            "count": len(employees),
            "data": employees
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/employees/{employee_id}")
async def get_employee_by_id(employee_id: int):
    """Get a single employee by ID"""
    try:
        employee = await asyncio.to_thread(odoo.search_read,
            model="hr.employee",
            domain=[("id", "=", employee_id)],
            fields=[
                "id",
                "name",
                "number",
                "work_email",
                "work_phone",
                "job_title",
                "department_id",
                "is_active",
                "identification_id",
                "date_delivrance_cin",
                "lieu_delivrance_cin",
                "address_home_id",
                "job_id",
                "start_date",
                "end_date",
                "birthday",
                "place_of_birth",
            ],
            limit=1
        )

        if not employee:
            raise HTTPException(status_code=404, detail="Employee not found")

        # Format department_id (many2one)
        emp = employee[0]
        if emp.get("department_id"):
            emp["department"] = {
                "id": emp["department_id"][0],
                "name": emp["department_id"][1]
            }
        emp.pop("department_id", None)

        return emp

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/employees")
async def get_employees(
    limit: int = Query(500, ge=1, le=500, description="Maximum number of employees to return"),
    active: bool | None = None
):
    try:
        domain = []

        print(active)

        if active is not None:
            domain.append(("is_active", "=", active))

        employees = await asyncio.to_thread(odoo.search_read,
            model="hr.employee",
            domain=domain,
            fields=[
                "id",
                "name",
                "number",
                "work_email",
                "work_phone",
                "job_title",
                "department_id",
                "is_active",
                "identification_id",
                "date_delivrance_cin",
                "lieu_delivrance_cin",
                "address_home_id",
                "job_id",
                "start_date",
                "end_date",
                "birthday",
                "place_of_birth",
            ],
            limit=limit
        )

        # Format department_id (many2one)
        for emp in employees:
            print(emp)

            if emp.get("department_id"):
                emp["department"] = {
                    "name": emp["department_id"][1]
                }
            emp.pop("department_id", None)

        return {
            "count": len(employees),
            "data": employees
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

