export default {
    "scalars": [
        1,
        7
    ],
    "types": {
        "Bookmark": {
            "bookmarkId": [
                1
            ],
            "categories": [
                2
            ],
            "title": [
                1
            ],
            "url": [
                1
            ],
            "userId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "Category": {
            "bookmarks": [
                0
            ],
            "categoryId": [
                1
            ],
            "title": [
                1
            ],
            "userId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Mutation": {
            "bookmarkCreate": [
                0,
                {
                    "input": [
                        5,
                        "bookmarkCreateInput!"
                    ]
                }
            ],
            "bookmarkDelete": [
                0,
                {
                    "bookmarkId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "bookmarkEdit": [
                0,
                {
                    "input": [
                        6,
                        "bookmarkUpdateInput!"
                    ]
                }
            ],
            "categoryCreate": [
                2,
                {
                    "title": [
                        1,
                        "String!"
                    ]
                }
            ],
            "categoryDelete": [
                2,
                {
                    "categoryId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "categoryEdit": [
                2,
                {
                    "categoryId": [
                        1,
                        "String!"
                    ],
                    "title": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "bookmark": [
                0,
                {
                    "bookmarkId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "bookmarks": [
                0
            ],
            "categories": [
                2
            ],
            "category": [
                2,
                {
                    "categoryId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "bookmarkCreateInput": {
            "categoryIds": [
                1
            ],
            "title": [
                1
            ],
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "bookmarkUpdateInput": {
            "bookmarkId": [
                1
            ],
            "categoryIds": [
                1
            ],
            "title": [
                1
            ],
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {}
    }
}