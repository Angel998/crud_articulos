-- Obtener el siguiente ID para un nuevo articulo
drop function if exists func_get_next_articulo_id;
delimiter $$
create function func_get_next_articulo_id()
returns int
begin
	set @response = 0;
    
    set @response = (
		select id from tb_articulo u 
        order by u.id desc
        limit 1
    );
    
    if (@response is null) then
		set @response = 0;
	end if;
    
    set @response = @response + 1;
    
    return @response;
end $$
delimiter ;


drop procedure if exists proc_get_articulos;
delimiter $$
create procedure proc_get_articulos()
begin
	select a.id,
			a.nombre,
            a.codigo_barra,
            a.marca,
            a.cantidad,
            a.precio
    from tb_articulo a 
    where a.eliminado = false 
    order by a.nombre asc;
end $$
delimiter ;

drop procedure if exists proc_search_articulo;
delimiter $$
create procedure proc_search_articulo(in p_field varchar(255))
begin
	set p_field = trim(p_field);
    set @sql_query = "
    select distinct a.id,
			a.nombre,
            a.codigo_barra,
            a.marca,
            a.cantidad,
            a.precio
    from tb_articulo a 
    where a.eliminado = false ";
    
	if (!is_empty(p_field)) then
		set @search = concat('%', p_field , '%');
		set @sql_query = concat(@sql_query, " and (
			a.nombre like @search or 
            a.codigo_barra like @search or
            a.marca like @search 
        )");
    end if;
    
    set @sql_query = concat(@sql_query, " order by a.nombre asc;");
    PREPARE sql_statement FROM @sql_query;
	EXECUTE sql_statement;
end $$
delimiter ;

drop procedure if exists proc_get_articulo;
delimiter $$
create procedure proc_get_articulo(in p_id int(255))
begin
	if (valid_int_id(p_id)) then 
		select a.id,
				a.id_usuario_creador,
				a.nombre,
				a.codigo_barra,
				a.marca,
				a.cantidad,
				a.precio,
				a.fecha_creado
		from tb_articulo a 
		where a.eliminado = false and
		a.id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists proc_add_articulo;
delimiter $$
create procedure proc_add_articulo(in p_id_usuario_creador int(255),
									in p_nombre varchar(255),
                                    in p_codigo_barra varchar(200),
                                    in p_precio double,
                                    in p_marca varchar(100),
                                    in p_cantidad int(255))
begin
	set p_nombre = trim(p_nombre);
    set p_codigo_barra = trim(p_codigo_barra);
    set @new_id = null;
    
    if (valid_int_id(p_id_usuario_creador) and
		!is_empty(p_nombre) and 
		!is_empty(p_codigo_barra) and 
        p_precio >= 0 and 
        p_cantidad >= 0) then
    
		set @new_id = func_get_next_articulo_id();
        
        insert into tb_articulo (
			id, 
            id_usuario_creador,
            nombre,
            codigo_barra,
            precio,
            marca,
            cantidad
        ) values (
			@new_id,
            p_id_usuario_creador,
            p_nombre,
            p_codigo_barra,
            p_precio,
            p_marca,
            p_cantidad
        );
    end if;
    
    select @new_id as 'id';
end $$
delimiter ;


drop procedure if exists proc_update_articulo;
delimiter $$
create procedure proc_update_articulo(in p_id int(255),
									in p_nombre varchar(255),
                                    in p_codigo_barra varchar(200),
                                    in p_precio double,
                                    in p_marca varchar(100),
                                    in p_cantidad int(255))
begin
	set p_nombre = trim(p_nombre);
    set p_codigo_barra = trim(p_codigo_barra);
    
    if (valid_int_id(p_id) and
		!is_empty(p_nombre) and 
		!is_empty(p_codigo_barra) and 
        p_precio >= 0 and 
        p_cantidad >= 0) then
        
        update tb_articulo
        set nombre = p_nombre,
			codigo_barra = p_codigo_barra,
            precio = p_precio,
            marca = p_marca,
            cantidad = p_cantidad
		where eliminado = false and 
        id = p_id;
    end if;
    
end $$
delimiter ;

drop procedure if exists proc_delete_articulo;
delimiter $$
create procedure proc_delete_articulo(in p_id int(255))
begin
	if (valid_int_id(p_id)) then
		update tb_articulo
        set eliminado = true,
			fecha_eliminado = current_timestamp()
		where eliminado = false and 
        id = p_id;
    end if;
end $$
delimiter ;