export default {
    "scalars": [
        1,
        2,
        9
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
                    "input": [
                        7,
                        "bookmarkCreateInput!"
                    ]
                }
            ],
            "bookmarkDelete": [
                3,
                {
                    "bookmarkId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "bookmarkEdit": [
                3,
                {
                    "input": [
                        8,
                        "bookmarkUpdateInput!"
                    ]
                }
            ],
            "categoryCreate": [
                4,
                {
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "categoryDelete": [
                4,
                {
                    "categoryId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "categoryEdit": [
                4,
                {
                    "categoryId": [
                        2,
                        "String!"
                    ],
                    "title": [
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
        "bookmarkCreateInput": {
            "categoryIds": [
                2
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
        "bookmarkUpdateInput": {
            "bookmarkId": [
                2
            ],
            "categoryIds": [
                2
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
        "Boolean": {}
    }
}