
-- Retorna TRUE si el valor de un texto esta vacio
drop function if exists is_empty;
delimiter $$
create function is_empty(p_string text)
returns bool
begin
	set @r_response = true;
    
    if(p_string is not null and 
		trim(p_string) != "") then
		set @r_response = false;
    end if;
    
    return @r_response;
end $$
delimiter ;

-- Remueve todos los espacios de una cadena de texto
drop function if exists remove_spaces;
delimiter $$
create function remove_spaces(p_text text)
returns text
begin
	if (p_text is not null) then
        set p_text = replace(p_text, '\t', '');
        set p_text = replace(p_text, '\n', '');
        set p_text = replace(p_text, ' ', '');
    end if;
	return p_text;
end $$
delimiter ;

-- Remueve espacios adicionales de un texto y lo transforma a minusculas
drop function if exists trim_and_lower;
delimiter $$
create function trim_and_lower(p_texto text)
returns text
begin
	if(p_texto is not null) then
		set p_texto = lower(trim(p_texto));
    end if;
	return p_texto;
end $$
delimiter ;

-- Asigna un valor por defecto a una variable de tipo BOOLEAN
drop function if exists default_bool_value;
delimiter $$
create function default_bool_value(p_var boolean, p_default boolean)
returns bool
begin
	if(p_default is not null and
		p_var is null) then
		set p_var = p_default;
    elseif (p_var is null) then
		set p_var = false;
    end if;
	return p_var;
end $$
delimiter ;

-- Valida que un INT sea mayor que 0
drop function if exists valid_int_id;
delimiter $$
create function valid_int_id(p_value bigint)
returns boolean
begin
	set @r_response = !(p_value is null or 
						p_value <= 0);
    return @r_response;
end $$
delimiter ;

-- Transforma un texto a DOUBLE
drop function if exists str_to_double;
delimiter $$
create function str_to_double(p_value varchar(255))
returns double
begin
	set @response = 0;
	set p_value = trim(p_value);
    if(!is_empty(p_value)) then
		set @response = CAST(p_value as DECIMAL(9,2));
    end if;
    return @response;
end $$
delimiter ;