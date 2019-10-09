<?php
class User
{
    public function __construct()
    {
        $this->db = new Database;
    }

    public function is_user_admin($id)
    {
        $this->db->query("select func_is_usuario_admin(:p_id) as 'admin';");
        $this->db->bind(':p_id', $id);
        return $this->db->single()->admin == 1;
    }

    public function is_user_enabled($id)
    {
        $this->db->query("select func_is_usuario_enabled(:p_id) as 'enabled';");
        $this->db->bind(':p_id', $id);
        return $this->db->single()->enabled == 1;
    }

    public function get_users()
    {
        $this->db->query('call proc_get_usuarios();');
        return $this->parse_users($this->db->resultSet());
    }

    public function get_user_by_id($id)
    {
        $this->db->query('call proc_get_usuarios(:p_id);');
        $this->db->bind(':p_id', $id);
        return $this->parse_users($this->db->single());
    }

    public function get_user_to_auth($field)
    {
        $this->db->query('call proc_get_usuario_to_auth(:p_field);');
        $this->db->bind(':p_field', $field);
        return $this->parse_users($this->db->single());
    }

    public function add_user($user)
    {
        $this->db->query('call proc_add_usuario(:p_nombre,:p_nombre_usuario,:p_correo,:p_clave,:p_admin,:p_habilitado);');
        $this->db->bind(':p_nombre', $user->nombre);
        $this->db->bind(':p_nombre_usuario', $user->nombre_usuario);
        $this->db->bind(':p_correo', $user->correo);
        $this->db->bind(':p_clave', $user->clave);
        $this->db->bind(':p_admin', $user->admin);
        $this->db->bind(':p_habilitado', $user->habilitado);
        return $this->db->newId();
    }

    public function update_user($user)
    {
        $this->db->query('call proc_update_usuario(:p_id,:p_nombre,:p_nombre_usuario,:p_correo,:p_admin,:p_habilitado);');
        $this->db->bind(':p_id', $user->id);
        $this->db->bind(':p_nombre', $user->nombre);
        $this->db->bind(':p_nombre_usuario', $user->nombre_usuario);
        $this->db->bind(':p_correo', $user->correo);
        $this->db->bind(':p_admin', $user->admin);
        $this->db->bind(':p_habilitado', $user->habilitado);
        return $this->db->success();
    }

    public function update_user_password($id, $new_password)
    {
        $this->db->query('call proc_update_usuario_clave(:p_id, :p_clave);');
        $this->db->bind(':p_id', $id);
        $this->db->bind(':p_clave', $new_password);
        return $this->db->success();
    }

    public function delete_user($id)
    {
        $this->db->query('call proc_delete_usuario(:p_id)');
        $this->db->bind(':p_id', $id);
        return $this->db->success();
    }

    private function parse_users($users)
    {
        return convert_to_bool_values($users, ['admin', 'habilitado']);
    }
}
