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
    public static readonly BOOL = 41;
    public static readonly INT = 42;
    public static readonly FLOAT = 43;
    public static readonly STRING = 44;
    public static readonly IDENTIFIER = 45;
    public static readonly COMMENT = 46;
    public static readonly BLOCK_COMMENT = 47;
    public static readonly WS = 48;
    public static readonly RULE_prog = 0;
    public static readonly RULE_statement = 1;
    public static readonly RULE_varDeclaration = 2;
    public static readonly RULE_functionDeclaration = 3;
    public static readonly RULE_parameterList = 4;
    public static readonly RULE_parameter = 5;
    public static readonly RULE_returnStatement = 6;
    public static readonly RULE_ifStatement = 7;
    public static readonly RULE_blockStatement = 8;
    public static readonly RULE_type = 9;
    public static readonly RULE_expression = 10;
    public static readonly RULE_primary = 11;
    public static readonly RULE_arrayLiteral = 12;
    public static readonly RULE_expressionList = 13;
    public static readonly RULE_literal = 14;

    public static readonly literalNames = [
        null, "';'", "'let'", "'mut'", "':'", "'='", "'fn'", "'('", "')'", 
        "'->'", "','", "'return'", "'if'", "'else'", "'{'", "'}'", "'i32'", 
        "'f64'", "'bool'", "'String'", "'&str'", "'()'", "'['", "']'", "'Vec'", 
        "'<'", "'>'", "'.'", "'!'", "'-'", "'*'", "'/'", "'%'", "'+'", "'<='", 
        "'>='", "'=='", "'!='", "'&&'", "'||'", "'vec!'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, "BOOL", "INT", "FLOAT", 
        "STRING", "IDENTIFIER", "COMMENT", "BLOCK_COMMENT", "WS"
    ];
    public static readonly ruleNames = [
        "prog", "statement", "varDeclaration", "functionDeclaration", "parameterList", 
        "parameter", "returnStatement", "ifStatement", "blockStatement", 
        "type", "expression", "primary", "arrayLiteral", "expressionList", 
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
            this.state = 33;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 809523396) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 63) !== 0)) {
                {
                {
                this.state = 30;
                this.statement();
                }
                }
                this.state = 35;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 36;
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
            this.state = 46;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 38;
                this.varDeclaration();
                }
                break;
            case RustParser.T__5:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 39;
                this.functionDeclaration();
                }
                break;
            case RustParser.T__6:
            case RustParser.T__21:
            case RustParser.T__27:
            case RustParser.T__28:
            case RustParser.T__39:
            case RustParser.BOOL:
            case RustParser.INT:
            case RustParser.FLOAT:
            case RustParser.STRING:
            case RustParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 40;
                this.expression(0);
                this.state = 41;
                this.match(RustParser.T__0);
                }
                break;
            case RustParser.T__10:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 43;
                this.returnStatement();
                }
                break;
            case RustParser.T__11:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 44;
                this.ifStatement();
                }
                break;
            case RustParser.T__13:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 45;
                this.blockStatement();
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
            this.state = 48;
            this.match(RustParser.T__1);
            this.state = 50;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 3) {
                {
                this.state = 49;
                this.match(RustParser.T__2);
                }
            }

            this.state = 52;
            this.match(RustParser.IDENTIFIER);
            this.state = 55;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 53;
                this.match(RustParser.T__3);
                this.state = 54;
                this.type_();
                }
            }

            this.state = 59;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 5) {
                {
                this.state = 57;
                this.match(RustParser.T__4);
                this.state = 58;
                this.expression(0);
                }
            }

            this.state = 61;
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
            this.state = 63;
            this.match(RustParser.T__5);
            this.state = 64;
            this.match(RustParser.IDENTIFIER);
            this.state = 65;
            this.match(RustParser.T__6);
            this.state = 67;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 45) {
                {
                this.state = 66;
                this.parameterList();
                }
            }

            this.state = 69;
            this.match(RustParser.T__7);
            this.state = 72;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 9) {
                {
                this.state = 70;
                this.match(RustParser.T__8);
                this.state = 71;
                this.type_();
                }
            }

            this.state = 74;
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
            this.state = 76;
            this.parameter();
            this.state = 81;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 10) {
                {
                {
                this.state = 77;
                this.match(RustParser.T__9);
                this.state = 78;
                this.parameter();
                }
                }
                this.state = 83;
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
            this.state = 84;
            this.match(RustParser.IDENTIFIER);
            this.state = 85;
            this.match(RustParser.T__3);
            this.state = 86;
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
            this.state = 88;
            this.match(RustParser.T__10);
            this.state = 90;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 809500800) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 63) !== 0)) {
                {
                this.state = 89;
                this.expression(0);
                }
            }

            this.state = 92;
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
            this.state = 94;
            this.match(RustParser.T__11);
            this.state = 95;
            this.expression(0);
            this.state = 96;
            this.blockStatement();
            this.state = 102;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13) {
                {
                this.state = 97;
                this.match(RustParser.T__12);
                this.state = 100;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case RustParser.T__11:
                    {
                    this.state = 98;
                    this.ifStatement();
                    }
                    break;
                case RustParser.T__13:
                    {
                    this.state = 99;
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
    public blockStatement(): BlockStatementContext {
        let localContext = new BlockStatementContext(this.context, this.state);
        this.enterRule(localContext, 16, RustParser.RULE_blockStatement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 104;
            this.match(RustParser.T__13);
            this.state = 108;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 809523396) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 63) !== 0)) {
                {
                {
                this.state = 105;
                this.statement();
                }
                }
                this.state = 110;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 111;
            this.match(RustParser.T__14);
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
        this.enterRule(localContext, 18, RustParser.RULE_type);
        try {
            this.state = 128;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__15:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 113;
                this.match(RustParser.T__15);
                }
                break;
            case RustParser.T__16:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 114;
                this.match(RustParser.T__16);
                }
                break;
            case RustParser.T__17:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 115;
                this.match(RustParser.T__17);
                }
                break;
            case RustParser.T__18:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 116;
                this.match(RustParser.T__18);
                }
                break;
            case RustParser.T__19:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 117;
                this.match(RustParser.T__19);
                }
                break;
            case RustParser.T__20:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 118;
                this.match(RustParser.T__20);
                }
                break;
            case RustParser.T__21:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 119;
                this.match(RustParser.T__21);
                this.state = 120;
                this.type_();
                this.state = 121;
                this.match(RustParser.T__22);
                }
                break;
            case RustParser.T__23:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 123;
                this.match(RustParser.T__23);
                this.state = 124;
                this.match(RustParser.T__24);
                this.state = 125;
                this.type_();
                this.state = 126;
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
        let _startState = 20;
        this.enterRecursionRule(localContext, 20, RustParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 134;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__6:
            case RustParser.T__21:
            case RustParser.T__39:
            case RustParser.BOOL:
            case RustParser.INT:
            case RustParser.FLOAT:
            case RustParser.STRING:
            case RustParser.IDENTIFIER:
                {
                this.state = 131;
                this.primary();
                }
                break;
            case RustParser.T__27:
            case RustParser.T__28:
                {
                this.state = 132;
                _la = this.tokenStream.LA(1);
                if(!(_la === 28 || _la === 29)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 133;
                this.expression(8);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 180;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 178;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
                    case 1:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 136;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 137;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 7) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 138;
                        this.expression(8);
                        }
                        break;
                    case 2:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 139;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 140;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 29 || _la === 33)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 141;
                        this.expression(7);
                        }
                        break;
                    case 3:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 142;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 143;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & 1539) !== 0))) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 144;
                        this.expression(6);
                        }
                        break;
                    case 4:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 145;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 146;
                        localContext._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 36 || _la === 37)) {
                            localContext._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 147;
                        this.expression(5);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 148;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 149;
                        this.match(RustParser.T__37);
                        this.state = 150;
                        this.expression(4);
                        }
                        break;
                    case 6:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 151;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 152;
                        this.match(RustParser.T__38);
                        this.state = 153;
                        this.expression(3);
                        }
                        break;
                    case 7:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 154;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 155;
                        this.match(RustParser.T__4);
                        this.state = 156;
                        this.expression(2);
                        }
                        break;
                    case 8:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 157;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 158;
                        this.match(RustParser.T__26);
                        this.state = 159;
                        this.match(RustParser.IDENTIFIER);
                        this.state = 165;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
                        case 1:
                            {
                            this.state = 160;
                            this.match(RustParser.T__6);
                            this.state = 162;
                            this.errorHandler.sync(this);
                            _la = this.tokenStream.LA(1);
                            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 809500800) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 63) !== 0)) {
                                {
                                this.state = 161;
                                this.expressionList();
                                }
                            }

                            this.state = 164;
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
                        this.state = 167;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 168;
                        this.match(RustParser.T__21);
                        this.state = 169;
                        this.expression(0);
                        this.state = 170;
                        this.match(RustParser.T__22);
                        }
                        break;
                    case 10:
                        {
                        localContext = new ExpressionContext(parentContext, parentState);
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expression);
                        this.state = 172;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 173;
                        this.match(RustParser.T__6);
                        this.state = 175;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 809500800) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 63) !== 0)) {
                            {
                            this.state = 174;
                            this.expressionList();
                            }
                        }

                        this.state = 177;
                        this.match(RustParser.T__7);
                        }
                        break;
                    }
                    }
                }
                this.state = 182;
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
        this.enterRule(localContext, 22, RustParser.RULE_primary);
        try {
            this.state = 190;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 183;
                this.match(RustParser.IDENTIFIER);
                }
                break;
            case RustParser.BOOL:
            case RustParser.INT:
            case RustParser.FLOAT:
            case RustParser.STRING:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 184;
                this.literal();
                }
                break;
            case RustParser.T__6:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 185;
                this.match(RustParser.T__6);
                this.state = 186;
                this.expression(0);
                this.state = 187;
                this.match(RustParser.T__7);
                }
                break;
            case RustParser.T__21:
            case RustParser.T__39:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 189;
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
        this.enterRule(localContext, 24, RustParser.RULE_arrayLiteral);
        let _la: number;
        try {
            this.state = 203;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RustParser.T__21:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 192;
                this.match(RustParser.T__21);
                this.state = 194;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 809500800) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 63) !== 0)) {
                    {
                    this.state = 193;
                    this.expressionList();
                    }
                }

                this.state = 196;
                this.match(RustParser.T__22);
                }
                break;
            case RustParser.T__39:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 197;
                this.match(RustParser.T__39);
                this.state = 198;
                this.match(RustParser.T__21);
                this.state = 200;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 809500800) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 63) !== 0)) {
                    {
                    this.state = 199;
                    this.expressionList();
                    }
                }

                this.state = 202;
                this.match(RustParser.T__22);
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
        this.enterRule(localContext, 26, RustParser.RULE_expressionList);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 205;
            this.expression(0);
            this.state = 210;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 206;
                    this.match(RustParser.T__9);
                    this.state = 207;
                    this.expression(0);
                    }
                    }
                }
                this.state = 212;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
            }
            this.state = 214;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10) {
                {
                this.state = 213;
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
        this.enterRule(localContext, 28, RustParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 216;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 15) !== 0))) {
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
        case 10:
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
        4,1,48,219,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,1,0,5,0,32,8,0,10,0,12,0,35,9,0,1,0,1,0,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,3,1,47,8,1,1,2,1,2,3,2,51,8,2,1,2,1,2,1,2,3,2,
        56,8,2,1,2,1,2,3,2,60,8,2,1,2,1,2,1,3,1,3,1,3,1,3,3,3,68,8,3,1,3,
        1,3,1,3,3,3,73,8,3,1,3,1,3,1,4,1,4,1,4,5,4,80,8,4,10,4,12,4,83,9,
        4,1,5,1,5,1,5,1,5,1,6,1,6,3,6,91,8,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,
        1,7,3,7,101,8,7,3,7,103,8,7,1,8,1,8,5,8,107,8,8,10,8,12,8,110,9,
        8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,
        9,1,9,3,9,129,8,9,1,10,1,10,1,10,1,10,3,10,135,8,10,1,10,1,10,1,
        10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,
        10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,10,163,8,
        10,1,10,3,10,166,8,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,
        10,176,8,10,1,10,5,10,179,8,10,10,10,12,10,182,9,10,1,11,1,11,1,
        11,1,11,1,11,1,11,1,11,3,11,191,8,11,1,12,1,12,3,12,195,8,12,1,12,
        1,12,1,12,1,12,3,12,201,8,12,1,12,3,12,204,8,12,1,13,1,13,1,13,5,
        13,209,8,13,10,13,12,13,212,9,13,1,13,3,13,215,8,13,1,14,1,14,1,
        14,0,1,20,15,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,0,6,1,0,28,
        29,1,0,30,32,2,0,29,29,33,33,2,0,25,26,34,35,1,0,36,37,1,0,41,44,
        248,0,33,1,0,0,0,2,46,1,0,0,0,4,48,1,0,0,0,6,63,1,0,0,0,8,76,1,0,
        0,0,10,84,1,0,0,0,12,88,1,0,0,0,14,94,1,0,0,0,16,104,1,0,0,0,18,
        128,1,0,0,0,20,134,1,0,0,0,22,190,1,0,0,0,24,203,1,0,0,0,26,205,
        1,0,0,0,28,216,1,0,0,0,30,32,3,2,1,0,31,30,1,0,0,0,32,35,1,0,0,0,
        33,31,1,0,0,0,33,34,1,0,0,0,34,36,1,0,0,0,35,33,1,0,0,0,36,37,5,
        0,0,1,37,1,1,0,0,0,38,47,3,4,2,0,39,47,3,6,3,0,40,41,3,20,10,0,41,
        42,5,1,0,0,42,47,1,0,0,0,43,47,3,12,6,0,44,47,3,14,7,0,45,47,3,16,
        8,0,46,38,1,0,0,0,46,39,1,0,0,0,46,40,1,0,0,0,46,43,1,0,0,0,46,44,
        1,0,0,0,46,45,1,0,0,0,47,3,1,0,0,0,48,50,5,2,0,0,49,51,5,3,0,0,50,
        49,1,0,0,0,50,51,1,0,0,0,51,52,1,0,0,0,52,55,5,45,0,0,53,54,5,4,
        0,0,54,56,3,18,9,0,55,53,1,0,0,0,55,56,1,0,0,0,56,59,1,0,0,0,57,
        58,5,5,0,0,58,60,3,20,10,0,59,57,1,0,0,0,59,60,1,0,0,0,60,61,1,0,
        0,0,61,62,5,1,0,0,62,5,1,0,0,0,63,64,5,6,0,0,64,65,5,45,0,0,65,67,
        5,7,0,0,66,68,3,8,4,0,67,66,1,0,0,0,67,68,1,0,0,0,68,69,1,0,0,0,
        69,72,5,8,0,0,70,71,5,9,0,0,71,73,3,18,9,0,72,70,1,0,0,0,72,73,1,
        0,0,0,73,74,1,0,0,0,74,75,3,16,8,0,75,7,1,0,0,0,76,81,3,10,5,0,77,
        78,5,10,0,0,78,80,3,10,5,0,79,77,1,0,0,0,80,83,1,0,0,0,81,79,1,0,
        0,0,81,82,1,0,0,0,82,9,1,0,0,0,83,81,1,0,0,0,84,85,5,45,0,0,85,86,
        5,4,0,0,86,87,3,18,9,0,87,11,1,0,0,0,88,90,5,11,0,0,89,91,3,20,10,
        0,90,89,1,0,0,0,90,91,1,0,0,0,91,92,1,0,0,0,92,93,5,1,0,0,93,13,
        1,0,0,0,94,95,5,12,0,0,95,96,3,20,10,0,96,102,3,16,8,0,97,100,5,
        13,0,0,98,101,3,14,7,0,99,101,3,16,8,0,100,98,1,0,0,0,100,99,1,0,
        0,0,101,103,1,0,0,0,102,97,1,0,0,0,102,103,1,0,0,0,103,15,1,0,0,
        0,104,108,5,14,0,0,105,107,3,2,1,0,106,105,1,0,0,0,107,110,1,0,0,
        0,108,106,1,0,0,0,108,109,1,0,0,0,109,111,1,0,0,0,110,108,1,0,0,
        0,111,112,5,15,0,0,112,17,1,0,0,0,113,129,5,16,0,0,114,129,5,17,
        0,0,115,129,5,18,0,0,116,129,5,19,0,0,117,129,5,20,0,0,118,129,5,
        21,0,0,119,120,5,22,0,0,120,121,3,18,9,0,121,122,5,23,0,0,122,129,
        1,0,0,0,123,124,5,24,0,0,124,125,5,25,0,0,125,126,3,18,9,0,126,127,
        5,26,0,0,127,129,1,0,0,0,128,113,1,0,0,0,128,114,1,0,0,0,128,115,
        1,0,0,0,128,116,1,0,0,0,128,117,1,0,0,0,128,118,1,0,0,0,128,119,
        1,0,0,0,128,123,1,0,0,0,129,19,1,0,0,0,130,131,6,10,-1,0,131,135,
        3,22,11,0,132,133,7,0,0,0,133,135,3,20,10,8,134,130,1,0,0,0,134,
        132,1,0,0,0,135,180,1,0,0,0,136,137,10,7,0,0,137,138,7,1,0,0,138,
        179,3,20,10,8,139,140,10,6,0,0,140,141,7,2,0,0,141,179,3,20,10,7,
        142,143,10,5,0,0,143,144,7,3,0,0,144,179,3,20,10,6,145,146,10,4,
        0,0,146,147,7,4,0,0,147,179,3,20,10,5,148,149,10,3,0,0,149,150,5,
        38,0,0,150,179,3,20,10,4,151,152,10,2,0,0,152,153,5,39,0,0,153,179,
        3,20,10,3,154,155,10,1,0,0,155,156,5,5,0,0,156,179,3,20,10,2,157,
        158,10,11,0,0,158,159,5,27,0,0,159,165,5,45,0,0,160,162,5,7,0,0,
        161,163,3,26,13,0,162,161,1,0,0,0,162,163,1,0,0,0,163,164,1,0,0,
        0,164,166,5,8,0,0,165,160,1,0,0,0,165,166,1,0,0,0,166,179,1,0,0,
        0,167,168,10,10,0,0,168,169,5,22,0,0,169,170,3,20,10,0,170,171,5,
        23,0,0,171,179,1,0,0,0,172,173,10,9,0,0,173,175,5,7,0,0,174,176,
        3,26,13,0,175,174,1,0,0,0,175,176,1,0,0,0,176,177,1,0,0,0,177,179,
        5,8,0,0,178,136,1,0,0,0,178,139,1,0,0,0,178,142,1,0,0,0,178,145,
        1,0,0,0,178,148,1,0,0,0,178,151,1,0,0,0,178,154,1,0,0,0,178,157,
        1,0,0,0,178,167,1,0,0,0,178,172,1,0,0,0,179,182,1,0,0,0,180,178,
        1,0,0,0,180,181,1,0,0,0,181,21,1,0,0,0,182,180,1,0,0,0,183,191,5,
        45,0,0,184,191,3,28,14,0,185,186,5,7,0,0,186,187,3,20,10,0,187,188,
        5,8,0,0,188,191,1,0,0,0,189,191,3,24,12,0,190,183,1,0,0,0,190,184,
        1,0,0,0,190,185,1,0,0,0,190,189,1,0,0,0,191,23,1,0,0,0,192,194,5,
        22,0,0,193,195,3,26,13,0,194,193,1,0,0,0,194,195,1,0,0,0,195,196,
        1,0,0,0,196,204,5,23,0,0,197,198,5,40,0,0,198,200,5,22,0,0,199,201,
        3,26,13,0,200,199,1,0,0,0,200,201,1,0,0,0,201,202,1,0,0,0,202,204,
        5,23,0,0,203,192,1,0,0,0,203,197,1,0,0,0,204,25,1,0,0,0,205,210,
        3,20,10,0,206,207,5,10,0,0,207,209,3,20,10,0,208,206,1,0,0,0,209,
        212,1,0,0,0,210,208,1,0,0,0,210,211,1,0,0,0,211,214,1,0,0,0,212,
        210,1,0,0,0,213,215,5,10,0,0,214,213,1,0,0,0,214,215,1,0,0,0,215,
        27,1,0,0,0,216,217,7,5,0,0,217,29,1,0,0,0,25,33,46,50,55,59,67,72,
        81,90,100,102,108,128,134,162,165,175,178,180,190,194,200,203,210,
        214
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
