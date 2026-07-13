from app.database.connection import engine, Base
from sqlalchemy import text
from app.models.role import Role
from sqlalchemy.orm import Session

def seed_roles():
    with Session(engine) as session:
        # Clear existing roles if needed or just add the right ones
        # Actually, let's just insert them if they don't exist
        roles = ["Administrator", "Manager", "Employee", "Reviewer"]
        
        for r_name in roles:
            exists = session.query(Role).filter(Role.role_name == r_name).first()
            if not exists:
                new_role = Role(role_name=r_name)
                session.add(new_role)
        
        session.commit()
        
        # Now update the existing users to have the correct roles based on email
        session.execute(text("UPDATE users SET role_id = (SELECT id FROM roles WHERE role_name = 'Administrator') WHERE email = 'admin@edrp.com'"))
        session.execute(text("UPDATE users SET role_id = (SELECT id FROM roles WHERE role_name = 'Manager') WHERE email = 'manager@edrp.com'"))
        session.execute(text("UPDATE users SET role_id = (SELECT id FROM roles WHERE role_name = 'Employee') WHERE email = 'employee@edrp.com'"))
        session.commit()
        
        print("Roles seeded and users updated.")

if __name__ == "__main__":
    seed_roles()
