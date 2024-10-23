export const permissions = [
    {
        role: 'user',
        actions: [
            'get_adverts',
            'get_advert',
            'get_profile'
        ]
    },
    {
        role: 'vendor',
        actions: [
            'get_profile',
            'update_profile',
            'create_adverts',
            'update_adverts',
            'delete_adverts'
        ]
    }
]