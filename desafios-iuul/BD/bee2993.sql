-- SELECT amount, count(*) FROM value_table GROUP BY amount ORDER BY count DESC;
SELECT t.amount as most_frequent_value FROM (
    SELECT amount, count(*) FROM value_table 
    GROUP BY amount 
    ORDER BY count DESC 
    LIMIT 1
) t;