// Generated from src/Rust.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { RustListener } from "./RustListener.js";
import { RustVisitor } from "./RustVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class RustParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly T__7 = 8;
    public static readonly T__8 = 9;
    public static readonly T__9 = 10;
    public static readonly T__10 = 11;
    public static readonly T__11 = 12;
    public static readonly T__12 = 13;
    public static readonly T__13 = 14;
    public static readonly T__14 = 15;
    public static readonly T__15 = 16;
    public static readonly T__16 = 17;
    public static readonly T__17 = 18;
    public static readonly T__18 = 19;
    public static readonly T__19 = 20;
    public static readonly T__20 = 21;
    public static readonly T__21 = 22;
    public static readonly T__22 = 23;
    public static readonly T__23 = 24;
    public static readonly T__24 = 25;
    public static readonly T__25 = 26;
    public static readonly T__26 = 27;
    public static readonly T__27 = 28;
    public static readonly T__28 = 29;
    public static readonly T__29 = 30;
    public static readonly T__30 = 31;
    public static readonly T__31 = 32;
    public static readonly T__32 = 33;
    public static readonly T__33 = 34;
    public static readonly T__34 = 35;
    public static readonly T__35 = 36;
    public static readonly T__36 = 37;
    public static readonly T__37 = 38;
    public static readonly T__38 = 39;
    public static readonly T__39 = 40;
    public static readonly T__40 = 41;
    public static readonly T__41 = 42;
    public static readonly T__42 = 43;
    public static readonly T__43 = 44;
    public static readonly T__44 = 45;
    public static readonly T__45 = 46;
    public static readonly T__46 = 47;
    public static readonly T__47 = 48;
    public static readonly T__48 = 49;
    public static readonly BOOL = 50;
    public static readonly INT = 51;
    public static readonly FLOAT = 52;
    public static readonly STRING = 53;
    public static readonly BUILTIN = 54;
    public static readonly IDENTIFIER = 55;
    public static readonly COMMENT = 56;
    public static readonly BLOCK_COMMENT = 57;
    public static readonly WS = 58;
    public static readonly RULE_prog = 0;
    public static readonly RULE_statement = 1;
    public static readonly RULE_varDeclaration = 2;
    public static readonly RULE_functionDeclaration = 3;
    public static readonly RULE_parameterList = 4;
    public static readonly RULE_parameter = 5;
    public static readonly RULE_returnStatement = 6;
    public static readonly RULE_ifStatement = 7;
    public static readonly RULE_whileLoop = 8;
    public static readonly RULE_breakStatement = 9;
    public static readonly RULE_continueStatement = 10;
    public static readonly RULE_blockStatement = 11;
    public static readonly RULE_type = 12;
    public static readonly RULE_expression = 13;
    public static readonly RULE_primary = 14;
    public static readonly RULE_arrayLiteral = 15;
    public static readonly RULE_macroInvocation = 16;
    public static readonly RULE_macroArguments = 17;
    public static readonly RULE_expressionList = 18;
    public static readonly RULE_literal = 19;

    public static readonly literalNames = [
        null, "';'", "'let'", "'mut'", "':'", "'='", "'fn'", "'('", "')'", 
        "'()'", "'->'", "','", "'return'", "'if'", "'else'", "'while'", 
        "'break'", "'continue'", "'{'", "'}'", "'i32'", "'f64'", "'bool'", 
        "'String'", "'&str'", "'['", "']'", "'Vec'", "'<'", "'>'", "'.'", 
        "'!'", "'-'", "'+='", "'-='", "'*='", "'/='", "'%='", "'*'", "'/'", 
        "'%'", "'+'", "'<='", "'>='", "'=='", "'!='", "'&&'", "'||'", "'&'", 
        "'vec!'", null, null, null, null, "'println'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, "BOOL", "INT", "FLOAT", "STRING", 
        "BUILTIN", "IDENTIFIER", "COMMENT", "BLOCK_COMMENT", "WS"
    ];
    public static readonly ruleNames = [
        "prog", "statement", "varDeclaration", "functionDeclaration", "parameterList", 
        "parameter", "returnStatement", "ifStatement", "whileLoop", "breakStatement", 
        "continueStatement", "blockStatement", "type", "expression", "primary", 
        "arrayLiteral", "macroInvocation", "macroArguments", "expressionList", 
        "literal",
    ];

    public get grammarFileName(): string { return "Rust.g4"; }
    public get literalNames(): (string | null)[] { return RustParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return RustParser.symbolicNames; }
    public get ruleNames(): string[] { return RustParser.ruleNames; }
    public get serializedATN(): number[] { return RustParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, RustParser._ATN, RustParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public prog(): ProgContext {
        let localContext = new ProgContext(this.context, this.state);
        this.enterRule(localContext, 0, RustParser.RULE_prog);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 43;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181542084) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16711745) !== 0)) {
                {
                {
                this.state = 40;
                this.statement();
                }
                }
                this.state = 45;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 46;
            this.match(RustParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 2, RustParser.RULE_statement);
        try {
            this.state = 59;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 48;
                this.varDeclaration();
                }
                break;
            case RustParser.T__5:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 49;
                this.functionDeclaration();
                }
                break;
            case RustParser.T__6:
            case RustParser.T__24:
            case RustParser.T__30:
            case RustParser.T__31:
            case RustParser.T__37:
            case RustParser.T__47:
            case RustParser.T__48:
            case RustParser.BOOL:
            case RustParser.INT:
            case RustParser.FLOAT:
            case RustParser.STRING:
            case RustParser.BUILTIN:
            case RustParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 50;
                this.expression(0);
                this.state = 51;
                this.match(RustParser.T__0);
                }
                break;
            case RustParser.T__11:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 53;
                this.returnStatement();
                }
                break;
            case RustParser.T__12:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 54;
                this.ifStatement();
                }
                break;
            case RustParser.T__17:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 55;
                this.blockStatement();
                }
                break;
            case RustParser.T__14:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 56;
                this.whileLoop();
                }
                break;
            case RustParser.T__15:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 57;
                this.breakStatement();
                }
                break;
            case RustParser.T__16:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 58;
                this.continueStatement();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public varDeclaration(): VarDeclarationContext {
        let localContext = new VarDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 4, RustParser.RULE_varDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 61;
            this.match(RustParser.T__1);
            this.state = 63;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 62;
                this.match(RustParser.T__2);
                }
            }

            this.state = 65;
            this.match(RustParser.IDENTIFIER);
            this.state = 68;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 66;
                this.match(RustParser.T__3);
                this.state = 67;
                this.type_();
                }
            }

            this.state = 72;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 5) {
                {
                this.state = 70;
                this.match(RustParser.T__4);
                this.state = 71;
                this.expression(0);
                }
            }

            this.state = 74;
            this.match(RustParser.T__0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public functionDeclaration(): FunctionDeclarationContext {
        let localContext = new FunctionDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 6, RustParser.RULE_functionDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 76;
            this.match(RustParser.T__5);
            this.state = 77;
            this.match(RustParser.IDENTIFIER);
            this.state = 84;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__6:
                {
                this.state = 78;
                this.match(RustParser.T__6);
                this.state = 80;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 55) {
                    {
                    this.state = 79;
                    this.parameterList();
                    }
                }

                this.state = 82;
                this.match(RustParser.T__7);
                }
                break;
            case RustParser.T__8:
                {
                this.state = 83;
                this.match(RustParser.T__8);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 88;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10) {
                {
                this.state = 86;
                this.match(RustParser.T__9);
                this.state = 87;
                this.type_();
                }
            }

            this.state = 90;
            this.blockStatement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public parameterList(): ParameterListContext {
        let localContext = new ParameterListContext(this.context, this.state);
        this.enterRule(localContext, 8, RustParser.RULE_parameterList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 92;
            this.parameter();
            this.state = 97;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 11) {
                {
                {
                this.state = 93;
                this.match(RustParser.T__10);
                this.state = 94;
                this.parameter();
                }
                }
                this.state = 99;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public parameter(): ParameterContext {
        let localContext = new ParameterContext(this.context, this.state);
        this.enterRule(localContext, 10, RustParser.RULE_parameter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 100;
            this.match(RustParser.IDENTIFIER);
            this.state = 101;
            this.match(RustParser.T__3);
            this.state = 102;
            this.type_();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public returnStatement(): ReturnStatementContext {
        let localContext = new ReturnStatementContext(this.context, this.state);
        this.enterRule(localContext, 12, RustParser.RULE_returnStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 104;
            this.match(RustParser.T__11);
            this.state = 106;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181038208) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16711745) !== 0)) {
                {
                this.state = 105;
                this.expression(0);
                }
            }

            this.state = 108;
            this.match(RustParser.T__0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ifStatement(): IfStatementContext {
        let localContext = new IfStatementContext(this.context, this.state);
        this.enterRule(localContext, 14, RustParser.RULE_ifStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 110;
            this.match(RustParser.T__12);
            this.state = 111;
            this.expression(0);
            this.state = 112;
            this.blockStatement();
            this.state = 118;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 14) {
                {
                this.state = 113;
                this.match(RustParser.T__13);
                this.state = 116;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case RustParser.T__12:
                    {
                    this.state = 114;
                    this.ifStatement();
                    }
                    break;
                case RustParser.T__17:
                    {
                    this.state = 115;
                    this.blockStatement();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public whileLoop(): WhileLoopContext {
        let localContext = new WhileLoopContext(this.context, this.state);
        this.enterRule(localContext, 16, RustParser.RULE_whileLoop);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 120;
            this.match(RustParser.T__14);
            this.state = 121;
            this.expression(0);
            this.state = 122;
            this.blockStatement();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public breakStatement(): BreakStatementContext {
        let localContext = new BreakStatementContext(this.context, this.state);
        this.enterRule(localContext, 18, RustParser.RULE_breakStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 124;
            this.match(RustParser.T__15);
            this.state = 125;
            this.match(RustParser.T__0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public continueStatement(): ContinueStatementContext {
        let localContext = new ContinueStatementContext(this.context, this.state);
        this.enterRule(localContext, 20, RustParser.RULE_continueStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 127;
            this.match(RustParser.T__16);
            this.state = 128;
            this.match(RustParser.T__0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public blockStatement(): BlockStatementContext {
        let localContext = new BlockStatementContext(this.context, this.state);
        this.enterRule(localContext, 22, RustParser.RULE_blockStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 130;
            this.match(RustParser.T__17);
            this.state = 134;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181542084) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16711745) !== 0)) {
                {
                {
                this.state = 131;
                this.statement();
                }
                }
                this.state = 136;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 137;
            this.match(RustParser.T__18);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public type_(): TypeContext {
        let localContext = new TypeContext(this.context, this.state);
        this.enterRule(localContext, 24, RustParser.RULE_type);
        try {
            this.state = 154;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__19:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 139;
                this.match(RustParser.T__19);
                }
                break;
            case RustParser.T__20:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 140;
                this.match(RustParser.T__20);
                }
                break;
            case RustParser.T__21:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 141;
                this.match(RustParser.T__21);
                }
                break;
            case RustParser.T__22:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 142;
                this.match(RustParser.T__22);
                }
                break;
            case RustParser.T__23:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 143;
                this.match(RustParser.T__23);
                }
                break;
            case RustParser.T__8:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 144;
                this.match(RustParser.T__8);
                }
                break;
            case RustParser.T__24:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 145;
                this.match(RustParser.T__24);
                this.state = 146;
                this.type_();
                this.state = 147;
                this.match(RustParser.T__25);
                }
                break;
            case RustParser.T__26:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 149;
                this.match(RustParser.T__26);
                this.state = 150;
                this.match(RustParser.T__27);
                this.state = 151;
                this.type_();
                this.state = 152;
                this.match(RustParser.T__28);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expression(): ExpressionContext;
    public expression(_p: number): ExpressionContext;
    public expression(_p?: number): ExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 26;
        this.enterRecursionRule(localContext, 26, RustParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 160;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__6:
            case RustParser.T__24:
            case RustParser.T__37:
            case RustParser.T__47:
            case RustParser.T__48:
            case RustParser.BOOL:
            case RustParser.INT:
            case RustParser.FLOAT:
            case RustParser.STRING:
            case RustParser.BUILTIN:
            case RustParser.IDENTIFIER:
                {
                this.state = 157;
                this.primary();
                }
                break;
            case RustParser.T__30:
            case RustParser.T__31:
                {
                this.state = 158;
                _la = this.tokenStream.LA(1);
                if(!(_la === 31 || _la === 32)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 159;
                this.expression(9);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 213;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 211;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 162;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 163;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 31) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 164;
                        this.expression(9);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 165;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 166;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 7) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 167;
                        this.expression(8);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 168;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 169;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 32 || _la === 41)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 170;
                        this.expression(7);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 171;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 172;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 49155) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 173;
                        this.expression(6);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 174;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 175;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 44 || _la === 45)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 176;
                        this.expression(5);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 177;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 178;
                        this.match(RustParser.T__45);
                        this.state = 179;
                        this.expression(4);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 180;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 181;
                        this.match(RustParser.T__46);
                        this.state = 182;
                        this.expression(3);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 183;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 184;
                        this.match(RustParser.T__4);
                        this.state = 185;
                        this.expression(2);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 186;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 187;
                        this.match(RustParser.T__29);
                        this.state = 188;
                        this.match(RustParser.IDENTIFIER);
                        this.state = 195;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
                        case 1:
                            {
                            this.state = 189;
                            this.match(RustParser.T__6);
                            this.state = 191;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181038208) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16711745) !== 0)) {
                                {
                                this.state = 190;
                                this.expressionList();
                                }
                            }

                            this.state = 193;
                            this.match(RustParser.T__7);
                            }
                            break;
                        case 2:
                            {
                            this.state = 194;
                            this.match(RustParser.T__8);
                            }
                            break;
                        }
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 197;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 198;
                        this.match(RustParser.T__24);
                        this.state = 199;
                        this.expression(0);
                        this.state = 200;
                        this.match(RustParser.T__25);
                        }
                        break;
                    case 11:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 202;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 209;
                        this.errorHandler.sync(this);
                        switch (this.tokenStream.LA(1)) {
                        case RustParser.T__6:
                            {
                            this.state = 203;
                            this.match(RustParser.T__6);
                            this.state = 205;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181038208) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16711745) !== 0)) {
                                {
                                this.state = 204;
                                this.expressionList();
                                }
                            }

                            this.state = 207;
                            this.match(RustParser.T__7);
                            }
                            break;
                        case RustParser.T__8:
                            {
                            this.state = 208;
                            this.match(RustParser.T__8);
                            }
                            break;
                        default:
                            throw new antlr.NoViableAltException(this);
                        }
                        }
                        break;
                    }
                    }
                }
                this.state = 215;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public primary(): PrimaryContext {
        let localContext = new PrimaryContext(this.context, this.state);
        this.enterRule(localContext, 28, RustParser.RULE_primary);
        let _la: number;
        try {
            this.state = 231;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.BUILTIN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 216;
                this.macroInvocation();
                }
                break;
            case RustParser.T__47:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 217;
                this.match(RustParser.T__47);
                this.state = 219;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 3) {
                    {
                    this.state = 218;
                    this.match(RustParser.T__2);
                    }
                }

                this.state = 221;
                this.match(RustParser.IDENTIFIER);
                }
                break;
            case RustParser.T__37:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 222;
                this.match(RustParser.T__37);
                this.state = 223;
                this.match(RustParser.IDENTIFIER);
                }
                break;
            case RustParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 224;
                this.match(RustParser.IDENTIFIER);
                }
                break;
            case RustParser.BOOL:
            case RustParser.INT:
            case RustParser.FLOAT:
            case RustParser.STRING:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 225;
                this.literal();
                }
                break;
            case RustParser.T__6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 226;
                this.match(RustParser.T__6);
                this.state = 227;
                this.expression(0);
                this.state = 228;
                this.match(RustParser.T__7);
                }
                break;
            case RustParser.T__24:
            case RustParser.T__48:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 230;
                this.arrayLiteral();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arrayLiteral(): ArrayLiteralContext {
        let localContext = new ArrayLiteralContext(this.context, this.state);
        this.enterRule(localContext, 30, RustParser.RULE_arrayLiteral);
        let _la: number;
        try {
            this.state = 244;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__24:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 233;
                this.match(RustParser.T__24);
                this.state = 235;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181038208) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16711745) !== 0)) {
                    {
                    this.state = 234;
                    this.expressionList();
                    }
                }

                this.state = 237;
                this.match(RustParser.T__25);
                }
                break;
            case RustParser.T__48:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 238;
                this.match(RustParser.T__48);
                this.state = 239;
                this.match(RustParser.T__24);
                this.state = 241;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181038208) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 16711745) !== 0)) {
                    {
                    this.state = 240;
                    this.expressionList();
                    }
                }

                this.state = 243;
                this.match(RustParser.T__25);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public macroInvocation(): MacroInvocationContext {
        let localContext = new MacroInvocationContext(this.context, this.state);
        this.enterRule(localContext, 32, RustParser.RULE_macroInvocation);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 246;
            this.match(RustParser.BUILTIN);
            this.state = 247;
            this.match(RustParser.T__30);
            this.state = 260;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__6:
                {
                this.state = 248;
                this.match(RustParser.T__6);
                this.state = 249;
                this.macroArguments();
                this.state = 250;
                this.match(RustParser.T__7);
                }
                break;
            case RustParser.T__24:
                {
                this.state = 252;
                this.match(RustParser.T__24);
                this.state = 253;
                this.macroArguments();
                this.state = 254;
                this.match(RustParser.T__25);
                }
                break;
            case RustParser.T__17:
                {
                this.state = 256;
                this.match(RustParser.T__17);
                this.state = 257;
                this.macroArguments();
                this.state = 258;
                this.match(RustParser.T__18);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public macroArguments(): MacroArgumentsContext {
        let localContext = new MacroArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 34, RustParser.RULE_macroArguments);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 264;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
            case 1:
                {
                this.state = 262;
                this.expression(0);
                }
                break;
            case 2:
                {
                this.state = 263;
                this.match(RustParser.STRING);
                }
                break;
            }
            this.state = 273;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 266;
                    this.match(RustParser.T__10);
                    this.state = 269;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
                    case 1:
                        {
                        this.state = 267;
                        this.expression(0);
                        }
                        break;
                    case 2:
                        {
                        this.state = 268;
                        this.match(RustParser.STRING);
                        }
                        break;
                    }
                    }
                    }
                }
                this.state = 275;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
            }
            this.state = 277;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 276;
                this.match(RustParser.T__10);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expressionList(): ExpressionListContext {
        let localContext = new ExpressionListContext(this.context, this.state);
        this.enterRule(localContext, 36, RustParser.RULE_expressionList);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 279;
            this.expression(0);
            this.state = 284;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 31, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 280;
                    this.match(RustParser.T__10);
                    this.state = 281;
                    this.expression(0);
                    }
                    }
                }
                this.state = 286;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 31, this.context);
            }
            this.state = 288;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 287;
                this.match(RustParser.T__10);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 38, RustParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 290;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 15) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 13:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 8);
        case 1:
            return this.precpred(this.context, 7);
        case 2:
            return this.precpred(this.context, 6);
        case 3:
            return this.precpred(this.context, 5);
        case 4:
            return this.precpred(this.context, 4);
        case 5:
            return this.precpred(this.context, 3);
        case 6:
            return this.precpred(this.context, 2);
        case 7:
            return this.precpred(this.context, 1);
        case 8:
            return this.precpred(this.context, 12);
        case 9:
            return this.precpred(this.context, 11);
        case 10:
            return this.precpred(this.context, 10);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,58,293,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,1,0,
        5,0,42,8,0,10,0,12,0,45,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,3,1,60,8,1,1,2,1,2,3,2,64,8,2,1,2,1,2,1,2,3,2,69,
        8,2,1,2,1,2,3,2,73,8,2,1,2,1,2,1,3,1,3,1,3,1,3,3,3,81,8,3,1,3,1,
        3,3,3,85,8,3,1,3,1,3,3,3,89,8,3,1,3,1,3,1,4,1,4,1,4,5,4,96,8,4,10,
        4,12,4,99,9,4,1,5,1,5,1,5,1,5,1,6,1,6,3,6,107,8,6,1,6,1,6,1,7,1,
        7,1,7,1,7,1,7,1,7,3,7,117,8,7,3,7,119,8,7,1,8,1,8,1,8,1,8,1,9,1,
        9,1,9,1,10,1,10,1,10,1,11,1,11,5,11,133,8,11,10,11,12,11,136,9,11,
        1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
        1,12,1,12,1,12,1,12,3,12,155,8,12,1,13,1,13,1,13,1,13,3,13,161,8,
        13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,
        13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,
        13,1,13,1,13,1,13,3,13,192,8,13,1,13,1,13,3,13,196,8,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,3,13,206,8,13,1,13,1,13,3,13,210,8,
        13,5,13,212,8,13,10,13,12,13,215,9,13,1,14,1,14,1,14,3,14,220,8,
        14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,232,8,
        14,1,15,1,15,3,15,236,8,15,1,15,1,15,1,15,1,15,3,15,242,8,15,1,15,
        3,15,245,8,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
        1,16,1,16,1,16,1,16,3,16,261,8,16,1,17,1,17,3,17,265,8,17,1,17,1,
        17,1,17,3,17,270,8,17,5,17,272,8,17,10,17,12,17,275,9,17,1,17,3,
        17,278,8,17,1,18,1,18,1,18,5,18,283,8,18,10,18,12,18,286,9,18,1,
        18,3,18,289,8,18,1,19,1,19,1,19,0,1,26,20,0,2,4,6,8,10,12,14,16,
        18,20,22,24,26,28,30,32,34,36,38,0,7,1,0,31,32,1,0,33,37,1,0,38,
        40,2,0,32,32,41,41,2,0,28,29,42,43,1,0,44,45,1,0,50,53,334,0,43,
        1,0,0,0,2,59,1,0,0,0,4,61,1,0,0,0,6,76,1,0,0,0,8,92,1,0,0,0,10,100,
        1,0,0,0,12,104,1,0,0,0,14,110,1,0,0,0,16,120,1,0,0,0,18,124,1,0,
        0,0,20,127,1,0,0,0,22,130,1,0,0,0,24,154,1,0,0,0,26,160,1,0,0,0,
        28,231,1,0,0,0,30,244,1,0,0,0,32,246,1,0,0,0,34,264,1,0,0,0,36,279,
        1,0,0,0,38,290,1,0,0,0,40,42,3,2,1,0,41,40,1,0,0,0,42,45,1,0,0,0,
        43,41,1,0,0,0,43,44,1,0,0,0,44,46,1,0,0,0,45,43,1,0,0,0,46,47,5,
        0,0,1,47,1,1,0,0,0,48,60,3,4,2,0,49,60,3,6,3,0,50,51,3,26,13,0,51,
        52,5,1,0,0,52,60,1,0,0,0,53,60,3,12,6,0,54,60,3,14,7,0,55,60,3,22,
        11,0,56,60,3,16,8,0,57,60,3,18,9,0,58,60,3,20,10,0,59,48,1,0,0,0,
        59,49,1,0,0,0,59,50,1,0,0,0,59,53,1,0,0,0,59,54,1,0,0,0,59,55,1,
        0,0,0,59,56,1,0,0,0,59,57,1,0,0,0,59,58,1,0,0,0,60,3,1,0,0,0,61,
        63,5,2,0,0,62,64,5,3,0,0,63,62,1,0,0,0,63,64,1,0,0,0,64,65,1,0,0,
        0,65,68,5,55,0,0,66,67,5,4,0,0,67,69,3,24,12,0,68,66,1,0,0,0,68,
        69,1,0,0,0,69,72,1,0,0,0,70,71,5,5,0,0,71,73,3,26,13,0,72,70,1,0,
        0,0,72,73,1,0,0,0,73,74,1,0,0,0,74,75,5,1,0,0,75,5,1,0,0,0,76,77,
        5,6,0,0,77,84,5,55,0,0,78,80,5,7,0,0,79,81,3,8,4,0,80,79,1,0,0,0,
        80,81,1,0,0,0,81,82,1,0,0,0,82,85,5,8,0,0,83,85,5,9,0,0,84,78,1,
        0,0,0,84,83,1,0,0,0,85,88,1,0,0,0,86,87,5,10,0,0,87,89,3,24,12,0,
        88,86,1,0,0,0,88,89,1,0,0,0,89,90,1,0,0,0,90,91,3,22,11,0,91,7,1,
        0,0,0,92,97,3,10,5,0,93,94,5,11,0,0,94,96,3,10,5,0,95,93,1,0,0,0,
        96,99,1,0,0,0,97,95,1,0,0,0,97,98,1,0,0,0,98,9,1,0,0,0,99,97,1,0,
        0,0,100,101,5,55,0,0,101,102,5,4,0,0,102,103,3,24,12,0,103,11,1,
        0,0,0,104,106,5,12,0,0,105,107,3,26,13,0,106,105,1,0,0,0,106,107,
        1,0,0,0,107,108,1,0,0,0,108,109,5,1,0,0,109,13,1,0,0,0,110,111,5,
        13,0,0,111,112,3,26,13,0,112,118,3,22,11,0,113,116,5,14,0,0,114,
        117,3,14,7,0,115,117,3,22,11,0,116,114,1,0,0,0,116,115,1,0,0,0,117,
        119,1,0,0,0,118,113,1,0,0,0,118,119,1,0,0,0,119,15,1,0,0,0,120,121,
        5,15,0,0,121,122,3,26,13,0,122,123,3,22,11,0,123,17,1,0,0,0,124,
        125,5,16,0,0,125,126,5,1,0,0,126,19,1,0,0,0,127,128,5,17,0,0,128,
        129,5,1,0,0,129,21,1,0,0,0,130,134,5,18,0,0,131,133,3,2,1,0,132,
        131,1,0,0,0,133,136,1,0,0,0,134,132,1,0,0,0,134,135,1,0,0,0,135,
        137,1,0,0,0,136,134,1,0,0,0,137,138,5,19,0,0,138,23,1,0,0,0,139,
        155,5,20,0,0,140,155,5,21,0,0,141,155,5,22,0,0,142,155,5,23,0,0,
        143,155,5,24,0,0,144,155,5,9,0,0,145,146,5,25,0,0,146,147,3,24,12,
        0,147,148,5,26,0,0,148,155,1,0,0,0,149,150,5,27,0,0,150,151,5,28,
        0,0,151,152,3,24,12,0,152,153,5,29,0,0,153,155,1,0,0,0,154,139,1,
        0,0,0,154,140,1,0,0,0,154,141,1,0,0,0,154,142,1,0,0,0,154,143,1,
        0,0,0,154,144,1,0,0,0,154,145,1,0,0,0,154,149,1,0,0,0,155,25,1,0,
        0,0,156,157,6,13,-1,0,157,161,3,28,14,0,158,159,7,0,0,0,159,161,
        3,26,13,9,160,156,1,0,0,0,160,158,1,0,0,0,161,213,1,0,0,0,162,163,
        10,8,0,0,163,164,7,1,0,0,164,212,3,26,13,9,165,166,10,7,0,0,166,
        167,7,2,0,0,167,212,3,26,13,8,168,169,10,6,0,0,169,170,7,3,0,0,170,
        212,3,26,13,7,171,172,10,5,0,0,172,173,7,4,0,0,173,212,3,26,13,6,
        174,175,10,4,0,0,175,176,7,5,0,0,176,212,3,26,13,5,177,178,10,3,
        0,0,178,179,5,46,0,0,179,212,3,26,13,4,180,181,10,2,0,0,181,182,
        5,47,0,0,182,212,3,26,13,3,183,184,10,1,0,0,184,185,5,5,0,0,185,
        212,3,26,13,2,186,187,10,12,0,0,187,188,5,30,0,0,188,195,5,55,0,
        0,189,191,5,7,0,0,190,192,3,36,18,0,191,190,1,0,0,0,191,192,1,0,
        0,0,192,193,1,0,0,0,193,196,5,8,0,0,194,196,5,9,0,0,195,189,1,0,
        0,0,195,194,1,0,0,0,195,196,1,0,0,0,196,212,1,0,0,0,197,198,10,11,
        0,0,198,199,5,25,0,0,199,200,3,26,13,0,200,201,5,26,0,0,201,212,
        1,0,0,0,202,209,10,10,0,0,203,205,5,7,0,0,204,206,3,36,18,0,205,
        204,1,0,0,0,205,206,1,0,0,0,206,207,1,0,0,0,207,210,5,8,0,0,208,
        210,5,9,0,0,209,203,1,0,0,0,209,208,1,0,0,0,210,212,1,0,0,0,211,
        162,1,0,0,0,211,165,1,0,0,0,211,168,1,0,0,0,211,171,1,0,0,0,211,
        174,1,0,0,0,211,177,1,0,0,0,211,180,1,0,0,0,211,183,1,0,0,0,211,
        186,1,0,0,0,211,197,1,0,0,0,211,202,1,0,0,0,212,215,1,0,0,0,213,
        211,1,0,0,0,213,214,1,0,0,0,214,27,1,0,0,0,215,213,1,0,0,0,216,232,
        3,32,16,0,217,219,5,48,0,0,218,220,5,3,0,0,219,218,1,0,0,0,219,220,
        1,0,0,0,220,221,1,0,0,0,221,232,5,55,0,0,222,223,5,38,0,0,223,232,
        5,55,0,0,224,232,5,55,0,0,225,232,3,38,19,0,226,227,5,7,0,0,227,
        228,3,26,13,0,228,229,5,8,0,0,229,232,1,0,0,0,230,232,3,30,15,0,
        231,216,1,0,0,0,231,217,1,0,0,0,231,222,1,0,0,0,231,224,1,0,0,0,
        231,225,1,0,0,0,231,226,1,0,0,0,231,230,1,0,0,0,232,29,1,0,0,0,233,
        235,5,25,0,0,234,236,3,36,18,0,235,234,1,0,0,0,235,236,1,0,0,0,236,
        237,1,0,0,0,237,245,5,26,0,0,238,239,5,49,0,0,239,241,5,25,0,0,240,
        242,3,36,18,0,241,240,1,0,0,0,241,242,1,0,0,0,242,243,1,0,0,0,243,
        245,5,26,0,0,244,233,1,0,0,0,244,238,1,0,0,0,245,31,1,0,0,0,246,
        247,5,54,0,0,247,260,5,31,0,0,248,249,5,7,0,0,249,250,3,34,17,0,
        250,251,5,8,0,0,251,261,1,0,0,0,252,253,5,25,0,0,253,254,3,34,17,
        0,254,255,5,26,0,0,255,261,1,0,0,0,256,257,5,18,0,0,257,258,3,34,
        17,0,258,259,5,19,0,0,259,261,1,0,0,0,260,248,1,0,0,0,260,252,1,
        0,0,0,260,256,1,0,0,0,261,33,1,0,0,0,262,265,3,26,13,0,263,265,5,
        53,0,0,264,262,1,0,0,0,264,263,1,0,0,0,265,273,1,0,0,0,266,269,5,
        11,0,0,267,270,3,26,13,0,268,270,5,53,0,0,269,267,1,0,0,0,269,268,
        1,0,0,0,270,272,1,0,0,0,271,266,1,0,0,0,272,275,1,0,0,0,273,271,
        1,0,0,0,273,274,1,0,0,0,274,277,1,0,0,0,275,273,1,0,0,0,276,278,
        5,11,0,0,277,276,1,0,0,0,277,278,1,0,0,0,278,35,1,0,0,0,279,284,
        3,26,13,0,280,281,5,11,0,0,281,283,3,26,13,0,282,280,1,0,0,0,283,
        286,1,0,0,0,284,282,1,0,0,0,284,285,1,0,0,0,285,288,1,0,0,0,286,
        284,1,0,0,0,287,289,5,11,0,0,288,287,1,0,0,0,288,289,1,0,0,0,289,
        37,1,0,0,0,290,291,7,6,0,0,291,39,1,0,0,0,33,43,59,63,68,72,80,84,
        88,97,106,116,118,134,154,160,191,195,205,209,211,213,219,231,235,
        241,244,260,264,269,273,277,284,288
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!RustParser.__ATN) {
            RustParser.__ATN = new antlr.ATNDeserializer().deserialize(RustParser._serializedATN);
        }

        return RustParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(RustParser.literalNames, RustParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return RustParser.vocabulary;
    }

    private static readonly decisionsToDFA = RustParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(RustParser.EOF, 0)!;
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_prog;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterProg) {
             listener.enterProg(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitProg) {
             listener.exitProg(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitProg) {
            return visitor.visitProg(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public varDeclaration(): VarDeclarationContext | null {
        return this.getRuleContext(0, VarDeclarationContext);
    }
    public functionDeclaration(): FunctionDeclarationContext | null {
        return this.getRuleContext(0, FunctionDeclarationContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public returnStatement(): ReturnStatementContext | null {
        return this.getRuleContext(0, ReturnStatementContext);
    }
    public ifStatement(): IfStatementContext | null {
        return this.getRuleContext(0, IfStatementContext);
    }
    public blockStatement(): BlockStatementContext | null {
        return this.getRuleContext(0, BlockStatementContext);
    }
    public whileLoop(): WhileLoopContext | null {
        return this.getRuleContext(0, WhileLoopContext);
    }
    public breakStatement(): BreakStatementContext | null {
        return this.getRuleContext(0, BreakStatementContext);
    }
    public continueStatement(): ContinueStatementContext | null {
        return this.getRuleContext(0, ContinueStatementContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_statement;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VarDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RustParser.IDENTIFIER, 0)!;
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_varDeclaration;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterVarDeclaration) {
             listener.enterVarDeclaration(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitVarDeclaration) {
             listener.exitVarDeclaration(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitVarDeclaration) {
            return visitor.visitVarDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RustParser.IDENTIFIER, 0)!;
    }
    public blockStatement(): BlockStatementContext {
        return this.getRuleContext(0, BlockStatementContext)!;
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public parameterList(): ParameterListContext | null {
        return this.getRuleContext(0, ParameterListContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_functionDeclaration;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterFunctionDeclaration) {
             listener.enterFunctionDeclaration(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitFunctionDeclaration) {
             listener.exitFunctionDeclaration(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitFunctionDeclaration) {
            return visitor.visitFunctionDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParameterListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public parameter(): ParameterContext[];
    public parameter(i: number): ParameterContext | null;
    public parameter(i?: number): ParameterContext[] | ParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParameterContext);
        }

        return this.getRuleContext(i, ParameterContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_parameterList;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterParameterList) {
             listener.enterParameterList(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitParameterList) {
             listener.exitParameterList(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitParameterList) {
            return visitor.visitParameterList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(RustParser.IDENTIFIER, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_parameter;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterParameter) {
             listener.enterParameter(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitParameter) {
             listener.exitParameter(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitParameter) {
            return visitor.visitParameter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ReturnStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_returnStatement;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterReturnStatement) {
             listener.enterReturnStatement(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitReturnStatement) {
             listener.exitReturnStatement(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitReturnStatement) {
            return visitor.visitReturnStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IfStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public blockStatement(): BlockStatementContext[];
    public blockStatement(i: number): BlockStatementContext | null;
    public blockStatement(i?: number): BlockStatementContext[] | BlockStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BlockStatementContext);
        }

        return this.getRuleContext(i, BlockStatementContext);
    }
    public ifStatement(): IfStatementContext | null {
        return this.getRuleContext(0, IfStatementContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_ifStatement;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterIfStatement) {
             listener.enterIfStatement(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitIfStatement) {
             listener.exitIfStatement(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitIfStatement) {
            return visitor.visitIfStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class WhileLoopContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public blockStatement(): BlockStatementContext {
        return this.getRuleContext(0, BlockStatementContext)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_whileLoop;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterWhileLoop) {
             listener.enterWhileLoop(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitWhileLoop) {
             listener.exitWhileLoop(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitWhileLoop) {
            return visitor.visitWhileLoop(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BreakStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_breakStatement;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterBreakStatement) {
             listener.enterBreakStatement(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitBreakStatement) {
             listener.exitBreakStatement(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitBreakStatement) {
            return visitor.visitBreakStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ContinueStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_continueStatement;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterContinueStatement) {
             listener.enterContinueStatement(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitContinueStatement) {
             listener.exitContinueStatement(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitContinueStatement) {
            return visitor.visitContinueStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BlockStatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_blockStatement;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterBlockStatement) {
             listener.enterBlockStatement(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitBlockStatement) {
             listener.exitBlockStatement(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitBlockStatement) {
            return visitor.visitBlockStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_type;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterType) {
             listener.enterType(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitType) {
             listener.exitType(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitType) {
            return visitor.visitType(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public _op?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primary(): PrimaryContext | null {
        return this.getRuleContext(0, PrimaryContext);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(RustParser.IDENTIFIER, 0);
    }
    public expressionList(): ExpressionListContext | null {
        return this.getRuleContext(0, ExpressionListContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_expression;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrimaryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public macroInvocation(): MacroInvocationContext | null {
        return this.getRuleContext(0, MacroInvocationContext);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(RustParser.IDENTIFIER, 0);
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public arrayLiteral(): ArrayLiteralContext | null {
        return this.getRuleContext(0, ArrayLiteralContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_primary;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterPrimary) {
             listener.enterPrimary(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitPrimary) {
             listener.exitPrimary(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitPrimary) {
            return visitor.visitPrimary(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArrayLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressionList(): ExpressionListContext | null {
        return this.getRuleContext(0, ExpressionListContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_arrayLiteral;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterArrayLiteral) {
             listener.enterArrayLiteral(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitArrayLiteral) {
             listener.exitArrayLiteral(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitArrayLiteral) {
            return visitor.visitArrayLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MacroInvocationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BUILTIN(): antlr.TerminalNode {
        return this.getToken(RustParser.BUILTIN, 0)!;
    }
    public macroArguments(): MacroArgumentsContext | null {
        return this.getRuleContext(0, MacroArgumentsContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_macroInvocation;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterMacroInvocation) {
             listener.enterMacroInvocation(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitMacroInvocation) {
             listener.exitMacroInvocation(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitMacroInvocation) {
            return visitor.visitMacroInvocation(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MacroArgumentsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RustParser.STRING);
    	} else {
    		return this.getToken(RustParser.STRING, i);
    	}
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_macroArguments;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterMacroArguments) {
             listener.enterMacroArguments(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitMacroArguments) {
             listener.exitMacroArguments(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitMacroArguments) {
            return visitor.visitMacroArguments(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_expressionList;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterExpressionList) {
             listener.enterExpressionList(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitExpressionList) {
             listener.exitExpressionList(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitExpressionList) {
            return visitor.visitExpressionList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INT(): antlr.TerminalNode | null {
        return this.getToken(RustParser.INT, 0);
    }
    public FLOAT(): antlr.TerminalNode | null {
        return this.getToken(RustParser.FLOAT, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(RustParser.STRING, 0);
    }
    public BOOL(): antlr.TerminalNode | null {
        return this.getToken(RustParser.BOOL, 0);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_literal;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitLiteral) {
            return visitor.visitLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
