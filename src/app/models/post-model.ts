export interface Post {
    numLikes:          number;
    numComentarios:    number;
    _id:               string;
    caption:           string;
    url:               string;
    usuario:           Usuario;
    fecha_creado:      Date;
    fecha_actualizado: Date;
    __v:               number;
    comentarios:       Comentario[];
    estaLike:          boolean;
    id:                string;
}

export interface Comentario {
    _id:               string;
    post:              string;
    usuario:           Usuario;
    mensaje:           string;
    fecha_creado:      Date;
    fecha_actualizado: Date;
    __v:               number;
}

export interface Usuario {
    imagen?:   null | string;
    _id:       string;
    username:  string;
    siguiendo: boolean;
    id:        string;
}