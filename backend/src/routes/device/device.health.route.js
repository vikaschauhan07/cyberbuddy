// ---------------------------------------------------------
// Device Health Routes
// ---------------------------------------------------------
// This router handles all device-level health and pairing APIs.
// These endpoints are primarily used by physical devices
// communicating with backend using device-based authentication.
// ---------------------------------------------------------

const express = require('express');
const DeviceHealthController = require('../../controllers/device/device.health.controller');

const router = express.Router();


// ---------------------------------------------------------
// 🔹 POST /check-status
// ---------------------------------------------------------
// Purpose:
//   - Allows a device to check its current registration status
//   - Verifies device signature using stored public key
//
// Required Headers:
//   - x-device-id
//   - x-device-signature
//
// Possible Responses:
//   - REGISTERED
//   - NOT_REGISTERED
//   - BLOCKED
// ---------------------------------------------------------
router.post("/check-status", DeviceHealthController.checkDeviceStatus);


// ---------------------------------------------------------
// 🔹 POST /add-device-serial
// ---------------------------------------------------------
// Purpose:
//   - Binds a device ID to a pre-registered serial number
//   - Stores device public key for future signature validation
//
// Required Headers:
//   - x-device-id
//
// Required Body:
//   - serialNumber
//   - publicKey
//
// Notes:
//   - Serial number must exist in database
//   - Prevents duplicate device association
//   - Marks device as paired upon success
// ---------------------------------------------------------
router.post("/add-device-serial", DeviceHealthController.addDeviceSerial);
router.post("/rotate-public-key", DeviceHealthController.rotatePublicKey);

router.post("/telemetry", DeviceHealthController.telemetry);
router.post("/error-logs", DeviceHealthController.errorLogs);



// ---------------------------------------------------------
// Export Router
// ---------------------------------------------------------
module.exports = router;