export const Roles = {
    GUEST: 'GUEST',
    USER: 'USER',
    DEVELOPER: 'DEVELOPER',
    PUBLISHER: 'PUBLISHER',
    ADMIN: 'ADMIN'
}

export const Permissions = {
    [Roles.GUEST]: ['VIEW_SHOP', 'VIEW_COMMUNITY'],
    [Roles.USER]: ['VIEW_SHOP', 'VIEW_COMMUNITY', 'VIEW_LIBRARY', 'ADD_REVIEW'],
    [Roles.DEVELOPER]: ['ADD_GAME', 'REMOVE_GAME', 'EDIT_GAME'],
    [Roles.PUBLISHER]: ['ADD_GAME', 'REMOVE_GAME', 'EDIT_GAME'],
    [Roles.ADMIN]: ['VIEW_SHOP', 'VIEW_COMMUNITY', 'VIEW_LIBRARY', 'REMOVE_REVIEW',
                    'ADD_GAME', 'REMOVE_GAME', 'ADD_GROUP', 'REMOVE_GROUP'],
}