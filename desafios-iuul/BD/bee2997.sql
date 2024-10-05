-- Para cada empregado, listar nome do departamento, nome do empregado, salário bruto, total de descontos e salário líquido. 
-- A saída deve estar agrupada por departamento e divisão. 
-- Dentro de cada divisão, a lista de empregados deve estar de forma decrescente por salário líquido.

-- Dica: Você pode utilizar a função COALESCE(check_expression , 0) para substituir algum valor null por zero; 
-- Além disso, você também pode utilizar a função ROUND(value, 2) para exibir os valores com 2 casas decimais.

SELECT 
    departamento.nome as "Departamento", 
    empregado.nome as "Empregado", 
FROM empregado
    JOIN divisao ON (empregado.lotacao_div = divisao.cod_divisao) 
    JOIN departamento ON (departamento.cod_dep = divisao.cod_dep);


SELECT empregado.nome FROM empregado
    JOIN emp_venc ON (emp_venc.matr = empregado.matr);

SELECT emp_venc.matr, SUM(vencimento.valor) as salario_bruto FROM vencimento
    JOIN emp_venc ON (emp_venc.cod_venc = vencimento.cod_venc) 
    GROUP BY emp_venc.matr;

SELECT emp_desc.matr, SUM(desconto.valor) as total_desconto FROM desconto
    JOIN emp_desc ON (emp_desc.cod_desc = desconto.cod_desc) 
    GROUP BY emp_desc.matr;


SELECT 
    departamento.nome as "Departamento",
    empregado.nome AS "Empregado", 
    COALESCE(soma_salario.valor, 0) AS "Salario Bruto",
    COALESCE(total_desconto.valor, 0) AS "Total Desconto",
    (COALESCE(soma_salario.valor, 0) - COALESCE(total_desconto.valor, 0)) AS "Salario Liquido"
FROM empregado
    JOIN divisao ON (empregado.lotacao_div = divisao.cod_divisao) 
    JOIN departamento ON (departamento.cod_dep = divisao.cod_dep) 
    LEFT JOIN (
        SELECT emp_venc.matr, SUM(vencimento.valor) AS valor FROM vencimento
        JOIN emp_venc ON (emp_venc.cod_venc = vencimento.cod_venc) 
        GROUP BY emp_venc.matr
    ) AS soma_salario ON (soma_salario.matr = empregado.matr)
    LEFT JOIN (
        SELECT emp_desc.matr, SUM(desconto.valor) AS valor FROM desconto
        JOIN emp_desc ON (emp_desc.cod_desc = desconto.cod_desc) 
        GROUP BY emp_desc.matr
    ) AS total_desconto ON (total_desconto.matr = empregado.matr)
ORDER BY "Salario Liquido" DESC;