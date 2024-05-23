export class AppConstants {

//	public static appParameterData: any;
	public static wideScreen:boolean = false;
	public static notificationProducts: any;
	public static url: string;


public static get userRoles(): string[] { return ['ADMIN', 'LEVEL_1', 'LEVEL_2'] };

// To shift the mappings for production and development

// public static get servicesURL(): string { return "https://101.53.153.132:8443/InventoryMgmt-0.0.1/api/"; };
// public static get servicesURL(): string { return "http://localhost:8080/api/"; };

//public static get servicesURL(): string { return "https://101.53.153.132:8443/InventoryMgmt-0.0.1/api/"; };

public static get servicesURL(): string { return this.url; };

 public static set servicesURL(url: string)
 {
 	this.url = url;
 }

// Security
	public static get applicationMachineId(): string { return 'inventory' };
	public static get applicationCredential(): string { return 'inventory' };

	public static get defaultPassword(): string { return 'password' };

	// Authentication service
	public static get USER_NAME_SESSION_ATTRIBUTE_NAME(): string { return 'authenticatedUser' };
	public static get USER_ROLE_SESSION_ATTRIBUTE_NAME(): string { return 'role' };
	public static get USER_PROFILEID_SESSION_ATTRIBUTE_NAME(): string { return 'profileId' };
	public static get INVMGMTAPP_PARAMETERS(): string { return 'InvMgmtAppParameters' };

}