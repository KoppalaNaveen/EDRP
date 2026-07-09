import sys
import os
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database.connection import SessionLocal
from app.services.decision_service import DecisionService
from app.schemas.decision import DecisionCreate

def test_integrity():
    db = SessionLocal()
    try:
        # Create a test decision
        decision_data = DecisionCreate(
            title="Test Decision",
            description="Testing the integrity hash feature",
            created_by=1, # Note: Assumes a user with ID 1 exists
            category_id=None
        )
        print("1. Creating a new Decision...")
        try:
            decision = DecisionService.create_decision(db, decision_data)
            print(f"   -> Decision created with ID {decision.id}")
            print(f"   -> Computed SHA-256 Hash: {decision.content_hash}")
            
            # Verify Integrity
            print("\n2. Running Integrity Check...")
            is_valid = DecisionService.verify_decision_integrity(db, decision.id)
            print(f"   -> Result: {'PASSED (Data is secure)' if is_valid else 'FAILED'}")
            
            # Simulate tampering directly in the database
            print("\n3. Simulating Malicious Tampering (modifying description directly in DB)...")
            db.execute(text(f"UPDATE decisions SET description = 'Tampered Data!' WHERE id = {decision.id}"))
            db.commit()
            
            # Verify Integrity Again
            print("\n4. Running Integrity Check again...")
            is_valid_after_tamper = DecisionService.verify_decision_integrity(db, decision.id)
            if is_valid_after_tamper:
                print("   -> Result: PASSED (Something went wrong, it shouldn't pass!)")
            else:
                print("   -> Result: FAILED (Tampering Detected Successfully!)")
                
            # Cleanup
            DecisionService.delete_decision(db, decision.id)
            
        except Exception as e:
            print(f"Could not complete test. Note: Ensure the database has a user with ID=1 to run this test. Error: {str(e)}")

    finally:
        db.close()

if __name__ == "__main__":
    test_integrity()
