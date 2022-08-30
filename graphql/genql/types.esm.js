export default {
    "scalars": [
        1,
        2,
        7
    ],
    "types": {
        "Article": {
            "id": [
                1
            ],
            "title": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "String": {},
        "Bookmark": {
            "bookmarkId": [
                2
            ],
            "categories": [
                4
            ],
            "title": [
                2
            ],
            "url": [
                2
            ],
            "userId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Category": {
            "bookmarks": [
                3
            ],
            "categoryId": [
                2
            ],
            "title": [
                2
            ],
            "userId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Mutation": {
            "bookmarkCreate": [
                3,
                {
                    "title": [
                        2,
                        "String!"
                    ],
                    "url": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createArticle": [
                0,
                {
                    "title": [
                        2,
                        "String!"
                    ],
                    "url": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Query": {
            "articles": [
                0
            ],
            "bookmark": [
                3
            ],
            "bookmarks": [
                3
            ],
            "categories": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {}
    }
}