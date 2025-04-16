grammar Rust;

// Root rule
prog: statement* EOF;

statement
    : varDeclaration
    | functionDeclaration
    | expression ';'
    | returnStatement
    | ifStatement
    | blockStatement
    | whileLoop
    | breakStatement
    | continueStatement
    ;

varDeclaration
    : 'let' 'mut'? IDENTIFIER (':' type)? ('=' expression)? ';'
    ;

functionDeclaration
    : 'fn' IDENTIFIER ('(' parameterList? ')' | '()') ('->' type)? blockStatement
    ;

parameterList
    : parameter (',' parameter)*
    ;

parameter
    : IDENTIFIER ':' type
    ;

returnStatement
    : 'return' expression? ';'
    ;

ifStatement
    : 'if' expression blockStatement ('else' (ifStatement | blockStatement))?
    ;

whileLoop
    : 'while' expression blockStatement
    ;

breakStatement
    : 'break' ';'
    ;

continueStatement
    : 'continue' ';'
    ;

blockStatement
    : '{' statement* '}'
    ;

type
    : 'i32'
    | 'f64'
    | 'bool'
    | 'String'
    | '&str'
    | '()'
    | '[' type ']'
    | 'Vec' '<' type '>'
    ;

expression
    : primary
    | expression '.' IDENTIFIER ('(' expressionList? ')' | '()')?
    | expression '[' expression ']'
    | expression ('(' expressionList? ')' | '()')
    | ('!'|'-') expression
    | expression op=('+='|'-='|'*='|'/='|'%=') expression
    | expression op=('*'|'/'|'%') expression
    | expression op=('+'|'-') expression
    | expression op=('<'|'>'|'<='|'>=') expression
    | expression op=('=='|'!=') expression
    | expression '&&' expression
    | expression '||' expression
    | expression '=' expression
    ;

primary
    : macroInvocation
    | IDENTIFIER
    | literal
    | '(' expression ')'
    | arrayLiteral
    ;

arrayLiteral
    : '[' expressionList? ']'
    | 'vec!' '[' expressionList? ']'
    ;

macroInvocation
    : BUILTIN '!' ('(' macroArguments ')' | '[' macroArguments ']' | '{' macroArguments '}')
    ;

macroArguments
    : (expression | STRING) (',' (expression | STRING))* ','?
    ;

expressionList
    : expression (',' expression)* ','?
    ;

literal
    : INT
    | FLOAT
    | STRING
    | BOOL
    ;

// Lexer rules
BOOL: 'true' | 'false';
INT: [0-9]+;
FLOAT: [0-9]+ '.' [0-9]+;
STRING: '"' (~["\r\n] | '\\"')* '"';
BUILTIN: 'println';
IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;
COMMENT: '//' ~[\r\n]* -> skip;
BLOCK_COMMENT: '/*' .*? '*/' -> skip;
WS: [ \t\r\n]+ -> skip;