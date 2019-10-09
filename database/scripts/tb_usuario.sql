-- Obtener el siguiente ID para un nuevo usuario
drop function if exists func_get_next_usuario_id;
delimiter $$
create function func_get_next_usuario_id()
returns int
begin
	set @response = 0;
    
    set @response = (
		select id from tb_usuario u 
        order by u.id desc
        limit 1
    );
    
    if (@response is null) then
		set @response = 1;
	end if;
    
    set @response = @response + 1;
    
    return @response;
end $$
delimiter ;


drop procedure if exists proc_get_usuarios;
delimiter $$
create procedure proc_get_usuarios()
begin 
	select u.id,
			u.nombre,
            u.nombre_usuario,
            u.correo,
            u.admin,
            u.habilitado
    from tb_usuario u
    where u.eliminado = false
    order by u.nombre asc;
end $$ 
delimiter ;

drop procedure if exists proc_get_usuario;
delimiter $$
create procedure proc_get_usuario(in p_id int(255))
begin
	if (valid_int_id(p_id)) then
		select u.id,
				u.nombre,
				u.nombre_usuario,
				u.correo,
				u.admin,
				u.habilitado
		from tb_usuario u
		where u.eliminado = false
		and u.id = p_id;
    end if;
end $$
delimiter ;

drop procedure if exists proc_add_usuario;
delimiter $$
create procedure proc_add_usuario(in p_nombre varchar(100),
									in p_nombre_usuario varchar(50),
                                    in p_correo varchar(100),
                                    in p_clave varchar(200),
                                    in p_admin boolean,
                                    in p_habilitado boolean)
begin
	set p_nombre = trim(p_nombre);
    set p_nombre_usuario = trim(p_nombre_usuario);
    set p_correo = trim(p_correo);
    set p_admin = default_bool_value(p_admin, false);
    set p_habilitado = default_bool_value(p_habilitado, true);
    
    set @new_id = null;
    
    if (!is_empty(p_nombre) and 
		!is_empty(p_nombre_usuario) and 
        !is_empty(p_correo) and 
        !is_empty(p_clave)) then
		
        set @new_id = func_get_next_usuario_id();
        
        insert into tb_usuario (
			id, 
            nombre, 
            nombre_usuario,
            correo,
            clave,
            admin,
            habilitado
        ) values (
			@new_id,
            p_nombre,
            p_nombre_usuario,
            p_correo,
            p_clave,
            p_admin,
            p_habilitado
        );
    end if;
    
    select @new_id as 'id';
end $$
delimiter ;

drop procedure if exists proc_update_usuario;
delimiter $$
create procedure proc_update_usuario(in p_id int(255),
									in p_nombre varchar(100),
									in p_nombre_usuario varchar(50),
                                    in p_correo varchar(100),
                                    in p_admin boolean,
                                    in p_habilitado boolean)
begin
	set p_nombre = trim(p_nombre);
    set p_nombre_usuario = trim(p_nombre_usuario);
    set p_correo = trim(p_correo);
    set p_admin = default_bool_value(p_admin, false);
    set p_habilitado = default_bool_value(p_habilitado, true);
    
    if (!is_empty(p_nombre) and 
		!is_empty(p_nombre_usuario) and 
        !is_empty(p_correo)) then
        update tb_usuario 
        set nombre = p_nombre,
			nombre_usuario = p_nombre_usuario,
            correo = p_correo,
            habilitado = p_habilitado,
            admin = p_admin
		where id = p_id and 
        eliminado = false;
	end if;
end $$
delimiter ;

drop procedure if exists proc_update_usuario_clave;
delimiter $$
create procedure proc_update_usuario_clave(in p_id int(255),
											in p_clave varchar(200))
begin
	if (valid_int_id(p_id) and 
		!is_empty(p_clave)) then
		update tb_usuario
        set clave = p_clave
        where id = p_id and 
        eliminado = false;
    end if;
end $$
delimiter ;

drop procedure if exists proc_delete_usuario;
delimiter $$
create procedure proc_delete_usuario(in p_id int(255))
begin
	if (valid_int_id(p_id)) then
		update tb_usuario 
        set eliminado = true,
			fecha_eliminado = CURRENT_TIMESTAMP
		where id = p_id and 
        eliminado = false;
    end if;
end $$
delimiter ;


-- Utils and Login
drop procedure if exists proc_get_usuario_to_auth;
delimiter $$
create procedure proc_get_usuario_to_auth(in p_field varchar(100))
begin
	select u.id,
            u.nombre,
            u.admin,
            u.clave,
            u.habilitado
    from tb_usuario u
    where (u.nombre_usuario = p_field or 
    u.correo = p_field) and
    u.eliminado = false;
end $$
delimiter ;

drop function if exists func_is_usuario_admin;
delimiter $$
create function func_is_usuario_admin(p_id int(255))
returns boolean
begin
	set @response = false;
    
    if (valid_int_id(p_id)) then
		set @response = exists (
			select * 
            from tb_usuario u
            where u.id = p_id 
            and u.habilitado = true 
            and u.admin = true 
            and u.eliminado = false
        );
    end if;
    
    return @response;
end $$
delimiter ;

drop function if exists func_is_usuario_enabled;
delimiter $$
create function func_is_usuario_enabled(p_id int(255))
returns boolean
begin
	set @response = false;
    
    if (valid_int_id(p_id)) then
		set @response = exists (
			select * 
            from tb_usuario u
            where u.id = p_id 
            and u.habilitado = true 
            and u.eliminado = false
        );
    end if;
    
    return @response;
end $$
delimiter ;