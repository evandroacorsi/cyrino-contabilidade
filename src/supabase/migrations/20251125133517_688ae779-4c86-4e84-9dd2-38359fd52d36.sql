-- =========================================
-- 1) ENUM PARA ROLES (admin / moderator / user)
-- =========================================
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');


-- =========================================
-- 2) TABELA DE ROLES DOS USUÁRIOS
-- =========================================
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);


-- =========================================
-- 3) ATIVAR RLS NA TABELA
-- =========================================
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;


-- =========================================
-- 4) FUNÇÃO PARA CHECAR SE UM USUÁRIO TEM UM PAPEL
-- =========================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


-- =========================================
-- 5) POLÍTICAS DE ACESSO (RLS)
-- =========================================

-- Usuário autenticado só pode ver seus próprios roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admin pode gerenciar tudo
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

