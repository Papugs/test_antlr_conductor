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
    public static readonly BOOL = 44;
    public static readonly INT = 45;
    public static readonly FLOAT = 46;
    public static readonly STRING = 47;
    public static readonly IDENTIFIER = 48;
    public static readonly COMMENT = 49;
    public static readonly BLOCK_COMMENT = 50;
    public static readonly WS = 51;
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
    public static readonly RULE_expressionList = 16;
    public static readonly RULE_literal = 17;

    public static readonly literalNames = [
        null, "';'", "'let'", "'mut'", "':'", "'='", "'fn'", "'('", "')'", 
        "'->'", "','", "'return'", "'if'", "'else'", "'while'", "'break'", 
        "'continue'", "'{'", "'}'", "'i32'", "'f64'", "'bool'", "'String'", 
        "'&str'", "'()'", "'['", "']'", "'Vec'", "'<'", "'>'", "'.'", "'!'", 
        "'-'", "'*'", "'/'", "'%'", "'+'", "'<='", "'>='", "'=='", "'!='", 
        "'&&'", "'||'", "'vec!'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        "BOOL", "INT", "FLOAT", "STRING", "IDENTIFIER", "COMMENT", "BLOCK_COMMENT", 
        "WS"
    ];
    public static readonly ruleNames = [
        "prog", "statement", "varDeclaration", "functionDeclaration", "parameterList", 
        "parameter", "returnStatement", "ifStatement", "whileLoop", "breakStatement", 
        "continueStatement", "blockStatement", "type", "expression", "primary", 
        "arrayLiteral", "expressionList", "literal",
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
            this.state = 39;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181290180) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 129025) !== 0)) {
                {
                {
                this.state = 36;
                this.statement();
                }
                }
                this.state = 41;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 42;
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
            this.state = 55;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 44;
                this.varDeclaration();
                }
                break;
            case RustParser.T__5:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 45;
                this.functionDeclaration();
                }
                break;
            case RustParser.T__6:
            case RustParser.T__24:
            case RustParser.T__30:
            case RustParser.T__31:
            case RustParser.T__42:
            case RustParser.BOOL:
            case RustParser.INT:
            case RustParser.FLOAT:
            case RustParser.STRING:
            case RustParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 46;
                this.expression(0);
                this.state = 47;
                this.match(RustParser.T__0);
                }
                break;
            case RustParser.T__10:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 49;
                this.returnStatement();
                }
                break;
            case RustParser.T__11:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 50;
                this.ifStatement();
                }
                break;
            case RustParser.T__16:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 51;
                this.blockStatement();
                }
                break;
            case RustParser.T__13:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 52;
                this.whileLoop();
                }
                break;
            case RustParser.T__14:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 53;
                this.breakStatement();
                }
                break;
            case RustParser.T__15:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 54;
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
            this.state = 57;
            this.match(RustParser.T__1);
            this.state = 59;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 58;
                this.match(RustParser.T__2);
                }
            }

            this.state = 61;
            this.match(RustParser.IDENTIFIER);
            this.state = 64;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 62;
                this.match(RustParser.T__3);
                this.state = 63;
                this.type_();
                }
            }

            this.state = 68;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 5) {
                {
                this.state = 66;
                this.match(RustParser.T__4);
                this.state = 67;
                this.expression(0);
                }
            }

            this.state = 70;
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
            this.state = 72;
            this.match(RustParser.T__5);
            this.state = 73;
            this.match(RustParser.IDENTIFIER);
            this.state = 74;
            this.match(RustParser.T__6);
            this.state = 76;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 48) {
                {
                this.state = 75;
                this.parameterList();
                }
            }

            this.state = 78;
            this.match(RustParser.T__7);
            this.state = 81;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 9) {
                {
                this.state = 79;
                this.match(RustParser.T__8);
                this.state = 80;
                this.type_();
                }
            }

            this.state = 83;
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
            this.state = 85;
            this.parameter();
            this.state = 90;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 10) {
                {
                {
                this.state = 86;
                this.match(RustParser.T__9);
                this.state = 87;
                this.parameter();
                }
                }
                this.state = 92;
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
            this.state = 93;
            this.match(RustParser.IDENTIFIER);
            this.state = 94;
            this.match(RustParser.T__3);
            this.state = 95;
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
            this.state = 97;
            this.match(RustParser.T__10);
            this.state = 99;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181038208) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 129025) !== 0)) {
                {
                this.state = 98;
                this.expression(0);
                }
            }

            this.state = 101;
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
            this.state = 103;
            this.match(RustParser.T__11);
            this.state = 104;
            this.expression(0);
            this.state = 105;
            this.blockStatement();
            this.state = 111;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13) {
                {
                this.state = 106;
                this.match(RustParser.T__12);
                this.state = 109;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case RustParser.T__11:
                    {
                    this.state = 107;
                    this.ifStatement();
                    }
                    break;
                case RustParser.T__16:
                    {
                    this.state = 108;
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
            this.state = 113;
            this.match(RustParser.T__13);
            this.state = 114;
            this.expression(0);
            this.state = 115;
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
            this.state = 117;
            this.match(RustParser.T__14);
            this.state = 118;
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
            this.state = 120;
            this.match(RustParser.T__15);
            this.state = 121;
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
            this.state = 123;
            this.match(RustParser.T__16);
            this.state = 127;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181290180) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 129025) !== 0)) {
                {
                {
                this.state = 124;
                this.statement();
                }
                }
                this.state = 129;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 130;
            this.match(RustParser.T__17);
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
            this.state = 147;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__18:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 132;
                this.match(RustParser.T__18);
                }
                break;
            case RustParser.T__19:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 133;
                this.match(RustParser.T__19);
                }
                break;
            case RustParser.T__20:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 134;
                this.match(RustParser.T__20);
                }
                break;
            case RustParser.T__21:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 135;
                this.match(RustParser.T__21);
                }
                break;
            case RustParser.T__22:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 136;
                this.match(RustParser.T__22);
                }
                break;
            case RustParser.T__23:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 137;
                this.match(RustParser.T__23);
                }
                break;
            case RustParser.T__24:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 138;
                this.match(RustParser.T__24);
                this.state = 139;
                this.type_();
                this.state = 140;
                this.match(RustParser.T__25);
                }
                break;
            case RustParser.T__26:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 142;
                this.match(RustParser.T__26);
                this.state = 143;
                this.match(RustParser.T__27);
                this.state = 144;
                this.type_();
                this.state = 145;
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
            this.state = 153;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__6:
            case RustParser.T__24:
            case RustParser.T__42:
            case RustParser.BOOL:
            case RustParser.INT:
            case RustParser.FLOAT:
            case RustParser.STRING:
            case RustParser.IDENTIFIER:
                {
                this.state = 150;
                this.primary();
                }
                break;
            case RustParser.T__30:
            case RustParser.T__31:
                {
                this.state = 151;
                _la = this.tokenStream.LA(1);
                if(!(_la === 31 || _la === 32)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 152;
                this.expression(8);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 199;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 197;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 155;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 156;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 7) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 157;
                        this.expression(8);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 158;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 159;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 32 || _la === 36)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 160;
                        this.expression(7);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 161;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 162;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 1539) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 163;
                        this.expression(6);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 164;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 165;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 39 || _la === 40)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 166;
                        this.expression(5);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 167;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 168;
                        this.match(RustParser.T__40);
                        this.state = 169;
                        this.expression(4);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 170;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 171;
                        this.match(RustParser.T__41);
                        this.state = 172;
                        this.expression(3);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 173;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 174;
                        this.match(RustParser.T__4);
                        this.state = 175;
                        this.expression(2);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 176;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 177;
                        this.match(RustParser.T__29);
                        this.state = 178;
                        this.match(RustParser.IDENTIFIER);
                        this.state = 184;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
                        case 1:
                            {
                            this.state = 179;
                            this.match(RustParser.T__6);
                            this.state = 181;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181038208) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 129025) !== 0)) {
                                {
                                this.state = 180;
                                this.expressionList();
                                }
                            }

                            this.state = 183;
                            this.match(RustParser.T__7);
                            }
                            break;
                        }
                        }
                        break;
                    case 9:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 186;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 187;
                        this.match(RustParser.T__24);
                        this.state = 188;
                        this.expression(0);
                        this.state = 189;
                        this.match(RustParser.T__25);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 191;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 192;
                        this.match(RustParser.T__6);
                        this.state = 194;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181038208) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 129025) !== 0)) {
                            {
                            this.state = 193;
                            this.expressionList();
                            }
                        }

                        this.state = 196;
                        this.match(RustParser.T__7);
                        }
                        break;
                    }
                    }
                }
                this.state = 201;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
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
        try {
            this.state = 209;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 202;
                this.match(RustParser.IDENTIFIER);
                }
                break;
            case RustParser.BOOL:
            case RustParser.INT:
            case RustParser.FLOAT:
            case RustParser.STRING:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 203;
                this.literal();
                }
                break;
            case RustParser.T__6:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 204;
                this.match(RustParser.T__6);
                this.state = 205;
                this.expression(0);
                this.state = 206;
                this.match(RustParser.T__7);
                }
                break;
            case RustParser.T__24:
            case RustParser.T__42:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 208;
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
            this.state = 222;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__24:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 211;
                this.match(RustParser.T__24);
                this.state = 213;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181038208) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 129025) !== 0)) {
                    {
                    this.state = 212;
                    this.expressionList();
                    }
                }

                this.state = 215;
                this.match(RustParser.T__25);
                }
                break;
            case RustParser.T__42:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 216;
                this.match(RustParser.T__42);
                this.state = 217;
                this.match(RustParser.T__24);
                this.state = 219;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2181038208) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 129025) !== 0)) {
                    {
                    this.state = 218;
                    this.expressionList();
                    }
                }

                this.state = 221;
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
    public expressionList(): ExpressionListContext {
        let localContext = new ExpressionListContext(this.context, this.state);
        this.enterRule(localContext, 32, RustParser.RULE_expressionList);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 224;
            this.expression(0);
            this.state = 229;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 225;
                    this.match(RustParser.T__9);
                    this.state = 226;
                    this.expression(0);
                    }
                    }
                }
                this.state = 231;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
            }
            this.state = 233;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10) {
                {
                this.state = 232;
                this.match(RustParser.T__9);
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
        this.enterRule(localContext, 34, RustParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 235;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 15) !== 0))) {
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
            return this.precpred(this.context, 7);
        case 1:
            return this.precpred(this.context, 6);
        case 2:
            return this.precpred(this.context, 5);
        case 3:
            return this.precpred(this.context, 4);
        case 4:
            return this.precpred(this.context, 3);
        case 5:
            return this.precpred(this.context, 2);
        case 6:
            return this.precpred(this.context, 1);
        case 7:
            return this.precpred(this.context, 11);
        case 8:
            return this.precpred(this.context, 10);
        case 9:
            return this.precpred(this.context, 9);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,51,238,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,1,0,5,0,38,8,0,10,0,12,0,
        41,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,56,
        8,1,1,2,1,2,3,2,60,8,2,1,2,1,2,1,2,3,2,65,8,2,1,2,1,2,3,2,69,8,2,
        1,2,1,2,1,3,1,3,1,3,1,3,3,3,77,8,3,1,3,1,3,1,3,3,3,82,8,3,1,3,1,
        3,1,4,1,4,1,4,5,4,89,8,4,10,4,12,4,92,9,4,1,5,1,5,1,5,1,5,1,6,1,
        6,3,6,100,8,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,3,7,110,8,7,3,7,112,
        8,7,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,10,1,10,1,10,1,11,1,11,5,11,126,
        8,11,10,11,12,11,129,9,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,
        1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,3,12,148,8,12,1,13,
        1,13,1,13,1,13,3,13,154,8,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
        1,13,1,13,1,13,1,13,1,13,1,13,3,13,182,8,13,1,13,3,13,185,8,13,1,
        13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,195,8,13,1,13,5,13,198,
        8,13,10,13,12,13,201,9,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,
        210,8,14,1,15,1,15,3,15,214,8,15,1,15,1,15,1,15,1,15,3,15,220,8,
        15,1,15,3,15,223,8,15,1,16,1,16,1,16,5,16,228,8,16,10,16,12,16,231,
        9,16,1,16,3,16,234,8,16,1,17,1,17,1,17,0,1,26,18,0,2,4,6,8,10,12,
        14,16,18,20,22,24,26,28,30,32,34,0,6,1,0,31,32,1,0,33,35,2,0,32,
        32,36,36,2,0,28,29,37,38,1,0,39,40,1,0,44,47,267,0,39,1,0,0,0,2,
        55,1,0,0,0,4,57,1,0,0,0,6,72,1,0,0,0,8,85,1,0,0,0,10,93,1,0,0,0,
        12,97,1,0,0,0,14,103,1,0,0,0,16,113,1,0,0,0,18,117,1,0,0,0,20,120,
        1,0,0,0,22,123,1,0,0,0,24,147,1,0,0,0,26,153,1,0,0,0,28,209,1,0,
        0,0,30,222,1,0,0,0,32,224,1,0,0,0,34,235,1,0,0,0,36,38,3,2,1,0,37,
        36,1,0,0,0,38,41,1,0,0,0,39,37,1,0,0,0,39,40,1,0,0,0,40,42,1,0,0,
        0,41,39,1,0,0,0,42,43,5,0,0,1,43,1,1,0,0,0,44,56,3,4,2,0,45,56,3,
        6,3,0,46,47,3,26,13,0,47,48,5,1,0,0,48,56,1,0,0,0,49,56,3,12,6,0,
        50,56,3,14,7,0,51,56,3,22,11,0,52,56,3,16,8,0,53,56,3,18,9,0,54,
        56,3,20,10,0,55,44,1,0,0,0,55,45,1,0,0,0,55,46,1,0,0,0,55,49,1,0,
        0,0,55,50,1,0,0,0,55,51,1,0,0,0,55,52,1,0,0,0,55,53,1,0,0,0,55,54,
        1,0,0,0,56,3,1,0,0,0,57,59,5,2,0,0,58,60,5,3,0,0,59,58,1,0,0,0,59,
        60,1,0,0,0,60,61,1,0,0,0,61,64,5,48,0,0,62,63,5,4,0,0,63,65,3,24,
        12,0,64,62,1,0,0,0,64,65,1,0,0,0,65,68,1,0,0,0,66,67,5,5,0,0,67,
        69,3,26,13,0,68,66,1,0,0,0,68,69,1,0,0,0,69,70,1,0,0,0,70,71,5,1,
        0,0,71,5,1,0,0,0,72,73,5,6,0,0,73,74,5,48,0,0,74,76,5,7,0,0,75,77,
        3,8,4,0,76,75,1,0,0,0,76,77,1,0,0,0,77,78,1,0,0,0,78,81,5,8,0,0,
        79,80,5,9,0,0,80,82,3,24,12,0,81,79,1,0,0,0,81,82,1,0,0,0,82,83,
        1,0,0,0,83,84,3,22,11,0,84,7,1,0,0,0,85,90,3,10,5,0,86,87,5,10,0,
        0,87,89,3,10,5,0,88,86,1,0,0,0,89,92,1,0,0,0,90,88,1,0,0,0,90,91,
        1,0,0,0,91,9,1,0,0,0,92,90,1,0,0,0,93,94,5,48,0,0,94,95,5,4,0,0,
        95,96,3,24,12,0,96,11,1,0,0,0,97,99,5,11,0,0,98,100,3,26,13,0,99,
        98,1,0,0,0,99,100,1,0,0,0,100,101,1,0,0,0,101,102,5,1,0,0,102,13,
        1,0,0,0,103,104,5,12,0,0,104,105,3,26,13,0,105,111,3,22,11,0,106,
        109,5,13,0,0,107,110,3,14,7,0,108,110,3,22,11,0,109,107,1,0,0,0,
        109,108,1,0,0,0,110,112,1,0,0,0,111,106,1,0,0,0,111,112,1,0,0,0,
        112,15,1,0,0,0,113,114,5,14,0,0,114,115,3,26,13,0,115,116,3,22,11,
        0,116,17,1,0,0,0,117,118,5,15,0,0,118,119,5,1,0,0,119,19,1,0,0,0,
        120,121,5,16,0,0,121,122,5,1,0,0,122,21,1,0,0,0,123,127,5,17,0,0,
        124,126,3,2,1,0,125,124,1,0,0,0,126,129,1,0,0,0,127,125,1,0,0,0,
        127,128,1,0,0,0,128,130,1,0,0,0,129,127,1,0,0,0,130,131,5,18,0,0,
        131,23,1,0,0,0,132,148,5,19,0,0,133,148,5,20,0,0,134,148,5,21,0,
        0,135,148,5,22,0,0,136,148,5,23,0,0,137,148,5,24,0,0,138,139,5,25,
        0,0,139,140,3,24,12,0,140,141,5,26,0,0,141,148,1,0,0,0,142,143,5,
        27,0,0,143,144,5,28,0,0,144,145,3,24,12,0,145,146,5,29,0,0,146,148,
        1,0,0,0,147,132,1,0,0,0,147,133,1,0,0,0,147,134,1,0,0,0,147,135,
        1,0,0,0,147,136,1,0,0,0,147,137,1,0,0,0,147,138,1,0,0,0,147,142,
        1,0,0,0,148,25,1,0,0,0,149,150,6,13,-1,0,150,154,3,28,14,0,151,152,
        7,0,0,0,152,154,3,26,13,8,153,149,1,0,0,0,153,151,1,0,0,0,154,199,
        1,0,0,0,155,156,10,7,0,0,156,157,7,1,0,0,157,198,3,26,13,8,158,159,
        10,6,0,0,159,160,7,2,0,0,160,198,3,26,13,7,161,162,10,5,0,0,162,
        163,7,3,0,0,163,198,3,26,13,6,164,165,10,4,0,0,165,166,7,4,0,0,166,
        198,3,26,13,5,167,168,10,3,0,0,168,169,5,41,0,0,169,198,3,26,13,
        4,170,171,10,2,0,0,171,172,5,42,0,0,172,198,3,26,13,3,173,174,10,
        1,0,0,174,175,5,5,0,0,175,198,3,26,13,2,176,177,10,11,0,0,177,178,
        5,30,0,0,178,184,5,48,0,0,179,181,5,7,0,0,180,182,3,32,16,0,181,
        180,1,0,0,0,181,182,1,0,0,0,182,183,1,0,0,0,183,185,5,8,0,0,184,
        179,1,0,0,0,184,185,1,0,0,0,185,198,1,0,0,0,186,187,10,10,0,0,187,
        188,5,25,0,0,188,189,3,26,13,0,189,190,5,26,0,0,190,198,1,0,0,0,
        191,192,10,9,0,0,192,194,5,7,0,0,193,195,3,32,16,0,194,193,1,0,0,
        0,194,195,1,0,0,0,195,196,1,0,0,0,196,198,5,8,0,0,197,155,1,0,0,
        0,197,158,1,0,0,0,197,161,1,0,0,0,197,164,1,0,0,0,197,167,1,0,0,
        0,197,170,1,0,0,0,197,173,1,0,0,0,197,176,1,0,0,0,197,186,1,0,0,
        0,197,191,1,0,0,0,198,201,1,0,0,0,199,197,1,0,0,0,199,200,1,0,0,
        0,200,27,1,0,0,0,201,199,1,0,0,0,202,210,5,48,0,0,203,210,3,34,17,
        0,204,205,5,7,0,0,205,206,3,26,13,0,206,207,5,8,0,0,207,210,1,0,
        0,0,208,210,3,30,15,0,209,202,1,0,0,0,209,203,1,0,0,0,209,204,1,
        0,0,0,209,208,1,0,0,0,210,29,1,0,0,0,211,213,5,25,0,0,212,214,3,
        32,16,0,213,212,1,0,0,0,213,214,1,0,0,0,214,215,1,0,0,0,215,223,
        5,26,0,0,216,217,5,43,0,0,217,219,5,25,0,0,218,220,3,32,16,0,219,
        218,1,0,0,0,219,220,1,0,0,0,220,221,1,0,0,0,221,223,5,26,0,0,222,
        211,1,0,0,0,222,216,1,0,0,0,223,31,1,0,0,0,224,229,3,26,13,0,225,
        226,5,10,0,0,226,228,3,26,13,0,227,225,1,0,0,0,228,231,1,0,0,0,229,
        227,1,0,0,0,229,230,1,0,0,0,230,233,1,0,0,0,231,229,1,0,0,0,232,
        234,5,10,0,0,233,232,1,0,0,0,233,234,1,0,0,0,234,33,1,0,0,0,235,
        236,7,5,0,0,236,35,1,0,0,0,25,39,55,59,64,68,76,81,90,99,109,111,
        127,147,153,181,184,194,197,199,209,213,219,222,229,233
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
    public parameterList(): ParameterListContext | null {
        return this.getRuleContext(0, ParameterListContext);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
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
