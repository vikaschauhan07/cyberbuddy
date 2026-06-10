const express = require('express');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const AdminSubscriptionController = require('../../controllers/admin/admin.subscription.controller');
const router = express.Router();

router.post(
    '/subscription/add',
    cedarAuthorize({
        action: 'create',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.addNewSubscription
);

router.post(
    '/subscription/add-new',
    cedarAuthorize({
        action: 'create',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.addNewSubscriptionNew
);

router.get(
    '/subscription/all',
    cedarAuthorize({
        action: 'list',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.getAllSubscritptions
);

router.get(
    '/subscription/details',
    cedarAuthorize({
        action: 'read',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.getSubscritptionDetails
);

router.get(
    '/subscription/view',
    cedarAuthorize({
        action: 'read',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.getSubscritptionDetails
);

router.get(
    '/subscription/transactions',
    cedarAuthorize({
        action: 'read',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.getSubscriptionTransactions
);

router.post(
    '/subscription/update',
    cedarAuthorize({
        action: 'update',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.updateSubscription
);

router.post(
    '/subscription/change-practice',
    cedarAuthorize({
        action: 'update',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.changePractice
);

router.post(
    '/subscription/cancel-renewal',
    cedarAuthorize({
        action: 'update',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.cancelRenewal
);

router.get(
    '/subscription/resend-link',
    cedarAuthorize({
        action: 'create',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.resendLink
);

router.get(
    '/subscription/transaction-groups',
    cedarAuthorize({
        action: 'list',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.getAllTransactionGroups
);

router.get(
    '/subscription/transaction-groups/view',
    cedarAuthorize({
        action: 'read',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.getTransactionGroupDetail
);

router.get(
    '/subscription/transaction-groups/resend-link',
    cedarAuthorize({
        action: 'create',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.resendTransactionStep
);

router.get(
    '/subscription/transaction-groups/expire-link',
    cedarAuthorize({
        action: 'update',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.expireTransactionStep
);

router.post(
    '/subscription/transaction-groups/cancel',
    cedarAuthorize({
        action: 'update',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.cancelTransactionGroup
);

router.get(
    '/subscription/payment-records',
    cedarAuthorize({
        action: 'list',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.getAllPaymentRecords
);

router.get(
    '/subscription/products',
    cedarAuthorize({
        action: 'list',
        resource: 'Subscription'
    }),
    AdminSubscriptionController.getAllStripeProducts
);

module.exports = router;
