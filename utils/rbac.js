export const permissions = [
    {
        role: 'user',
        actions: [
            'get_adverts',
            'get_advert',
            'get_profile',
            'update_profile'
        ]
    },
    {
        role: 'vendor',
        actions: [
            'get_profile',
            'update_profile',
            'create_advert',
            'update_advert',
            'delete_adverts'
        ]
    }
]