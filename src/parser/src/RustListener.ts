// Generated from src/Rust.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgContext } from "./RustParser.js";
import { StatementContext } from "./RustParser.js";
import { VarDeclarationContext } from "./RustParser.js";
import { FunctionDeclarationContext } from "./RustParser.js";
import { ParameterListContext } from "./RustParser.js";
import { ParameterContext } from "./RustParser.js";
import { ReturnStatementContext } from "./RustParser.js";
import { IfStatementContext } from "./RustParser.js";
import { WhileLoopContext } from "./RustParser.js";
import { BreakStatementContext } from "./RustParser.js";
import { ContinueStatementContext } from "./RustParser.js";
import { BlockStatementContext } from "./RustParser.js";
import { TypeContext } from "./RustParser.js";
import { ExpressionContext } from "./RustParser.js";
import { PrimaryContext } from "./RustParser.js";
import { ArrayLiteralContext } from "./RustParser.js";
import { ExpressionListContext } from "./RustParser.js";
import { LiteralContext } from "./RustParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `RustParser`.
 */
export class RustListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `RustParser.prog`.
     * @param ctx the parse tree
     */
    enterProg?: (ctx: ProgContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.prog`.
     * @param ctx the parse tree
     */
    exitProg?: (ctx: ProgContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.varDeclaration`.
     * @param ctx the parse tree
     */
    enterVarDeclaration?: (ctx: VarDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.varDeclaration`.
     * @param ctx the parse tree
     */
    exitVarDeclaration?: (ctx: VarDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.functionDeclaration`.
     * @param ctx the parse tree
     */
    enterFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.functionDeclaration`.
     * @param ctx the parse tree
     */
    exitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.parameterList`.
     * @param ctx the parse tree
     */
    enterParameterList?: (ctx: ParameterListContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.parameterList`.
     * @param ctx the parse tree
     */
    exitParameterList?: (ctx: ParameterListContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.parameter`.
     * @param ctx the parse tree
     */
    enterParameter?: (ctx: ParameterContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.parameter`.
     * @param ctx the parse tree
     */
    exitParameter?: (ctx: ParameterContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.returnStatement`.
     * @param ctx the parse tree
     */
    enterReturnStatement?: (ctx: ReturnStatementContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.returnStatement`.
     * @param ctx the parse tree
     */
    exitReturnStatement?: (ctx: ReturnStatementContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.ifStatement`.
     * @param ctx the parse tree
     */
    enterIfStatement?: (ctx: IfStatementContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.ifStatement`.
     * @param ctx the parse tree
     */
    exitIfStatement?: (ctx: IfStatementContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.whileLoop`.
     * @param ctx the parse tree
     */
    enterWhileLoop?: (ctx: WhileLoopContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.whileLoop`.
     * @param ctx the parse tree
     */
    exitWhileLoop?: (ctx: WhileLoopContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.breakStatement`.
     * @param ctx the parse tree
     */
    enterBreakStatement?: (ctx: BreakStatementContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.breakStatement`.
     * @param ctx the parse tree
     */
    exitBreakStatement?: (ctx: BreakStatementContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.continueStatement`.
     * @param ctx the parse tree
     */
    enterContinueStatement?: (ctx: ContinueStatementContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.continueStatement`.
     * @param ctx the parse tree
     */
    exitContinueStatement?: (ctx: ContinueStatementContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.blockStatement`.
     * @param ctx the parse tree
     */
    enterBlockStatement?: (ctx: BlockStatementContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.blockStatement`.
     * @param ctx the parse tree
     */
    exitBlockStatement?: (ctx: BlockStatementContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.type`.
     * @param ctx the parse tree
     */
    enterType?: (ctx: TypeContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.type`.
     * @param ctx the parse tree
     */
    exitType?: (ctx: TypeContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.primary`.
     * @param ctx the parse tree
     */
    enterPrimary?: (ctx: PrimaryContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.primary`.
     * @param ctx the parse tree
     */
    exitPrimary?: (ctx: PrimaryContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.arrayLiteral`.
     * @param ctx the parse tree
     */
    enterArrayLiteral?: (ctx: ArrayLiteralContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.arrayLiteral`.
     * @param ctx the parse tree
     */
    exitArrayLiteral?: (ctx: ArrayLiteralContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.expressionList`.
     * @param ctx the parse tree
     */
    enterExpressionList?: (ctx: ExpressionListContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.expressionList`.
     * @param ctx the parse tree
     */
    exitExpressionList?: (ctx: ExpressionListContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

