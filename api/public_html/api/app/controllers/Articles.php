<?php
class Articles extends Controller
{

    public function __construct()
    {
        $this->initController(CTR_PRIVATE);
        $this->articleModel = $this->model('Article');
    }

    public function get()
    {
        $this->useGetRequest();
        $articles = $this->articleModel->get_articles();
        $this->response($articles);
    }

    public function get_one($id)
    {
        $this->useGetRequest();
        $article = $this->articleModel->get_article($id);
        if (is_null($article)) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $this->response($article);
    }

    public function search($field)
    {
        $this->useGetRequest();
        $articles = $this->articleModel->search($field);
        $this->response($articles);
    }

    public function add()
    {
        $this->usePostRequest();
        $data = $this->validate_input_data(getJsonData());
        $data->id_usuario = $this->get_current_user_id();
        $newId = $this->articleModel->add_article($data);
        $this->checkNewId($newId);
        $this->response(['id' => $newId]);
    }

    public function update($id)
    {
        $this->usePutRequest();
        $data = $this->validate_input_data(getJsonData());
        $data->id = $id;
        $this->articleModel->update_article($data);
        $this->response(['id' => $id]);
    }

    public function delete($id)
    {
        $this->useDeleteRequest();
        $this->articleModel->delete_article($id);
        $this->response();
    }

    // === Helpers
    private function validate_input_data($data) {
        $errors = [];

        if(!isset($data->nombre) || 
            empty($data->nombre)) {
                $errors['nombre_error'] = "Campo requerido";
            }
        
            if(!isset($data->codigo_barra) || 
            empty($data->codigo_barra)) {
                $errors['codigo_barra_error'] = "Campo requerido";
            }

            if(!isset($data->precio) || 
            empty($data->precio)) {
                $errors['precio_error'] = "Campo requerido";
            } elseif (!($data->precio > 0)) {
                $data->precio = 0;
            }

            if(!isset($data->cantidad) || 
            empty($data->cantidad)) {
                $errors['cantidad_error'] = "Campo requerido";
            } elseif (!($data->cantidad > 0)) {
                $data->cantidad = 0;
            }

            if(!isset($data->marca) || 
            empty($data->marca)) {
                $data->marca = null;
            }
        $this->checkErrors($errors);
        return $data;
    }
}
