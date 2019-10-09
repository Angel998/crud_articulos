<?php
class Users extends Controller
{

    public function __construct()
    {
        $this->initController();
    }

    // @path api/users/get
    public function get()
    {
        $this->useGetRequest();
        $this->private_route(CTR_ADMIN);
        $users = $this->userModel->get_users();
        $this->response($users);
    }

    // @path api/users/get_one/:id
    public function get_one($id)
    {
        $this->useGetRequest();
        $this->private_route(CTR_ADMIN);
        $user = $this->userModel->get_user_by_id($id);
        $this->response($user, is_null($user) ? ERROR_NOTFOUND : null);
    }

    public function login()
    {
        $this->usePostRequest();
        $data = $this->validate_login_data(getJsonData());
        $user = $this->userModel->get_user_to_auth($data->user);
        $this->validate_user_status($user, $data);
        $new_token = $this->get_new_token($user);
        $this->response([
            'token' => $new_token
        ]);
    }

    private function validate_login_data($data)
    {

        $errors = [];

        if (
            !isset($data->user) ||
            empty($data->user)
        ) {
            $errors['user_error'] = "Campo requerido";
        }
        if (
            !isset($data->password) ||
            empty($data->password)
        ) {
            $errors['password_error'] = "Campo requerido";
        }

        $this->checkErrors($errors);

        return $data;
    }

    private function validate_user_status($user, $data)
    {
        if (
            !$user ||
            is_null($user) ||
            !password_verify($data->password, $user->clave)
        ) {
            $this->response(['password_error' => 'Usuario o clave incorrecta'], ERROR_NOTFOUND, false);
        } elseif (!$user->habilitado) {
            $this->response(['user_error' => 'Usuario invalido'], ERROR_FORBIDDEN, false);
        }
    }

    public function add()
    {
        $this->usePostRequest();
        $data = $this->validate_input_data(getJsonData());
        $newId = $this->userModel->add_user($data);
        $this->checkNewId($newId, [
            'usuario_error' => "Usuario o correo invalido"
        ]);
        $this->response(['id' => $newId]);
    }

    private function validate_input_data($data, $validate_password = true)
    {
        $errors = [];

        if (
            !isset($data->nombre) ||
            empty($data->nombre)
        ) {
            $errors['nombre_error'] = "Campo requerido";
        }

        if (
            !isset($data->nombre_usuario) ||
            empty($data->nombre_usuario)
        ) {
            $errors['nombre_usuario_error'] = "Campo requerido";
        }

        if (
            !isset($data->correo) ||
            empty($data->correo)
        ) {
            $errors['correo_error'] = "Campo requerido";
        }

        if ($validate_password) {
            $password_error = $this->validate_password($data);
            if (!is_null($password_error)) {
                $errors['clave_error'] = $password_error;
            }
        }

        if (
            isset($data->admin) &&
            !is_bool($data->admin)
        ) {
            $errors['admin_error'] = "Campo invalido";
        } elseif (!isset($data->admin)) {
            $data->admin = false;
        }

        if (
            isset($data->habilitado) &&
            !is_bool($data->habilitado)
        ) {
            $errors['habilitado_error'] = "Campo invalido";
        } elseif (!isset($data->habilitado)) {
            $data->habilitado = true;
        }

        $this->checkErrors($errors);

        if ($validate_password) {
            $data->clave = get_hash_password($data->clave);
        }
        return $data;
    }
    // ==== End Of Add

    public function update($id)
    {
        $this->usePutRequest();
        $this->private_route(CTR_ADMIN);
        $data = $this->validate_input_data(getJsonData());
        $data->id = $id;
        $this->userModel->update_user($data);
        $this->response($id);
    }

    public function update_password($id)
    {
        $this->usePutRequest();
        $this->private_route(CTR_ADMIN);
        $data = getJsonData();
        $password_error = $this->validate_password($data);
        $errors = [];
        if (!is_null($password_error)) {
            $errors['clave_error'] = $password_error;
        }
        $this->checkErrors($errors);

        $data->clave = get_hash_password($data->clave);
        $this->userModel->update_user_password($id, $data->clave);
        $this->response();
    }

    public function delete($id)
    {
        $this->useDeleteRequest();
        $this->private_route(CTR_ADMIN);
        $this->userModel->delete_user($id);
        $this->response();
    }

    // ==== Helpers
    private function validate_password($data)
    {
        if (
            !isset($data->clave) ||
            empty($data->clave)
        ) {
            return "Campo requerido";
        } else if (strlen($data->clave) < 5) {
            return "La clave debe poseer al menos 5 caracteres";
        }
        return null;
    }
}
