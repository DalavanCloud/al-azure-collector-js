/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Updater function helpers
 *
 * @end
 * -----------------------------------------------------------------------------
 */
'use strict';

const msRestAzure = require('ms-rest-azure');
const WebSiteManagement = require('azure-arm-website');

/**
 * @class
 * Helper class for Updater function.
 *
 * @constructor
 * @param {Object} azureOptional - optional Azure parameters.
 * @param {String} [azureOptional.clientId] - (optional) Application (client) ID. Default is process.env.CUSTOMCONNSTR_APP_CLIENT_ID
 * @param {String} [azureOptional.domain] - (optional) Directory (tenant) ID. Default is process.env.APP_TENANT_ID
 * @param {String} [azureOptional.clientSecret] - (optional) Application (client) secret. Default is process.env.CUSTOMCONNSTR_APP_CLIENT_SECRET
 * @param {String} [azureOptional.subscriptionId] - (optional) Azure subscription ID. Default is process.env.APP_SUBSCRIPTION_ID
 * @param {String} [azureOptional.resourceGroup] - (optional) Azure resource group where the function is deployed. Default is process.env.APP_RESOURCE_GROUP
 * @param {String} [azureOptional.webAppName] - (optional) Azure web application name Update is running for. Default is process.env.WEBSITE_SITE_NAME
 *
 */
class AlAzureUpdater {
    constructor({clientId, domain, clientSecret, subscriptionId, resourceGroup, webAppName} = {}) {
        this._clientId = clientId ? clientId : process.env.CUSTOMCONNSTR_APP_CLIENT_ID;
        this._domain = domain ? domain : process.env.APP_TENANT_ID;
        this._clientSecret = clientSecret ? clientSecret : process.env.CUSTOMCONNSTR_APP_CLIENT_SECRET;
        this._subscriptionId = subscriptionId ? subscriptionId : process.env.APP_SUBSCRIPTION_ID;
        this._resourceGroup = resourceGroup ? resourceGroup : process.env.APP_RESOURCE_GROUP;
        this._webAppName = webAppName ? webAppName : process.env.WEBSITE_SITE_NAME;
    }
    
    syncWebApp(callback) {
        var credentials = new msRestAzure.ApplicationTokenCredentials(this._clientId, this._domain, this._clientSecret);
        var webSiteClient = new WebSiteManagement(credentials, this._subscriptionId);
        return webSiteClient.webApps.syncRepository(this._resourceGroup, this._webAppName, callback);
    }
};
module.exports = {
    AlAzureUpdater: AlAzureUpdater
};

