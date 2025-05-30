export const Roles = {
    GUEST: 'GUEST',
    USER: 'USER',
    PUBLISHER: 'PUBLISHER',
    ADMIN: 'ADMIN'
}

export const Permissions = {
    [Roles.GUEST]: ['VIEW_SHOP', 'VIEW_COMMUNITY'],
    [Roles.USER]: ['VIEW_SHOP', 'VIEW_COMMUNITY', 'VIEW_LIBRARY', 'ADD_REVIEW'],
    [Roles.PUBLISHER]: ['VIEW_SHOP', 'VIEW_COMMUNITY', 'VIEW_LIBRARY', 'ADD_REVIEW'],
    [Roles.ADMIN]: ['VIEW_SHOP', 'VIEW_COMMUNITY', 'VIEW_LIBRARY', 'ADD_REVIEW']
}