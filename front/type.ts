

export interface Task {
    id:         number;
    title:      string;
    content:    null | string;
    createdAt:  Date;
    status:     boolean;
    categoryId: number;
    categories: Categories;
}

export interface Categories {
    id:   number;
    name: string;
}
