export default {
    "scalars": [
        1,
        3,
        10
    ],
    "types": {
        "Bookmark": {
            "bookmarkId": [
                1
            ],
            "categories": [
                2
            ],
            "favicon": [
                1
            ],
            "parentFolderId": [
                1
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
            "color": [
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
        "CategoryOptEnum": {},
        "Folder": {
            "bookmarks": [
                0
            ],
            "color": [
                1
            ],
            "folderId": [
                1
            ],
            "folders": [
                4
            ],
            "parentFolderId": [
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
                        7,
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
                        9,
                        "bookmarkUpdateInput!"
                    ]
                }
            ],
            "bookmarkSearch": [
                0,
                {
                    "input": [
                        8,
                        "bookmarkSearchInput!"
                    ]
                }
            ],
            "categoryCreate": [
                2,
                {
                    "color": [
                        1,
                        "String!"
                    ],
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
                    "color": [
                        1,
                        "String!"
                    ],
                    "title": [
                        1,
                        "String!"
                    ]
                }
            ],
            "folderCreate": [
                4,
                {
                    "color": [
                        1,
                        "String!"
                    ],
                    "parentFolderId": [
                        1,
                        "String!"
                    ],
                    "title": [
                        1,
                        "String!"
                    ]
                }
            ],
            "folderDelete": [
                4,
                {
                    "folderId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "folderEdit": [
                4,
                {
                    "color": [
                        1,
                        "String!"
                    ],
                    "folderId": [
                        1,
                        "String!"
                    ],
                    "parentFolderId": [
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
            "folders": [
                4
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
        "bookmarkSearchInput": {
            "categoryIds": [
                1
            ],
            "categoryOpt": [
                3
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