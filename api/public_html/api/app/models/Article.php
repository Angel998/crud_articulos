<?php
/* 
    Esta clase se encarga de ejecutar todas las operaciones
    en base de datos para los articulos
    */

class Article
{
    public function __construct()
    {
        $this->db = new Database;
    }

    public function get_articles()
    {
        $this->db->query('call proc_get_articulos()');
        return $this->db->resultSet();
    }

    public function get_article($id)
    {
        $this->db->query('call proc_get_articulo(:p_id)');
        $this->db->bind(':p_id', $id);
        return $this->db->single();
    }

    public function search($field)
    {
        $this->db->query('call proc_search_articulo(:p_field)');
        $this->db->bind(':p_field', $field);
        return $this->db->resultSet();
    }

    public function add_article($article)
    {
        $this->db->query('call proc_add_articulo(:p_id_usuario_creador,:p_nombre,:p_codigo_barra,:p_precio,:p_marca,:p_cantidad)');

        $this->db->bind(':p_id_usuario_creador', $article->id_usuario);
        $this->db->bind(':p_nombre', $article->nombre);
        $this->db->bind(':p_codigo_barra', $article->codigo_barra);
        $this->db->bind(':p_precio', $article->precio);
        $this->db->bind(':p_marca', $article->marca);
        $this->db->bind(':p_cantidad', $article->cantidad);
        return $this->db->newId();
    }

    public function update_article($article)
    {
        $this->db->query('call proc_update_articulo(:p_id,:p_nombre,:p_codigo_barra,:p_precio,:p_marca,:p_cantidad)');
        $this->db->bind(':p_id', $article->id);
        $this->db->bind(':p_nombre', $article->nombre);
        $this->db->bind(':p_codigo_barra', $article->codigo_barra);
        $this->db->bind(':p_precio', $article->precio);
        $this->db->bind(':p_marca', $article->marca);
        $this->db->bind(':p_cantidad', $article->cantidad);
        return $this->db->success();
    }

    public function delete_article($id)
    {
        $this->db->query('call proc_delete_articulo(:p_id)');
        $this->db->bind(':p_id', $id);
        return $this->db->success();
    }
}
