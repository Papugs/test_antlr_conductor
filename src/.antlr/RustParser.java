// Generated from c:/Users/eduar/WebstormProjects/test_antlr_conductor/src/Rust.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class RustParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		T__24=25, T__25=26, T__26=27, T__27=28, T__28=29, T__29=30, T__30=31, 
		T__31=32, T__32=33, T__33=34, T__34=35, T__35=36, T__36=37, T__37=38, 
		T__38=39, T__39=40, T__40=41, T__41=42, T__42=43, BOOL=44, INT=45, FLOAT=46, 
		STRING=47, IDENTIFIER=48, COMMENT=49, BLOCK_COMMENT=50, WS=51;
	public static final int
		RULE_prog = 0, RULE_statement = 1, RULE_varDeclaration = 2, RULE_functionDeclaration = 3, 
		RULE_parameterList = 4, RULE_parameter = 5, RULE_returnStatement = 6, 
		RULE_ifStatement = 7, RULE_whileLoop = 8, RULE_breakStatement = 9, RULE_continueStatement = 10, 
		RULE_blockStatement = 11, RULE_type = 12, RULE_expression = 13, RULE_primary = 14, 
		RULE_arrayLiteral = 15, RULE_expressionList = 16, RULE_literal = 17;
	private static String[] makeRuleNames() {
		return new String[] {
			"prog", "statement", "varDeclaration", "functionDeclaration", "parameterList", 
			"parameter", "returnStatement", "ifStatement", "whileLoop", "breakStatement", 
			"continueStatement", "blockStatement", "type", "expression", "primary", 
			"arrayLiteral", "expressionList", "literal"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "';'", "'let'", "'mut'", "':'", "'='", "'fn'", "'()'", "'->'", 
			"'('", "')'", "','", "'return'", "'if'", "'else'", "'while'", "'break'", 
			"'continue'", "'{'", "'}'", "'i32'", "'f64'", "'bool'", "'String'", "'&str'", 
			"'['", "']'", "'Vec'", "'<'", "'>'", "'.'", "'!'", "'-'", "'*'", "'/'", 
			"'%'", "'+'", "'<='", "'>='", "'=='", "'!='", "'&&'", "'||'", "'vec!'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, "BOOL", "INT", "FLOAT", 
			"STRING", "IDENTIFIER", "COMMENT", "BLOCK_COMMENT", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Rust.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public RustParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProgContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(RustParser.EOF, 0); }
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public ProgContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_prog; }
	}

	public final ProgContext prog() throws RecognitionException {
		ProgContext _localctx = new ProgContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_prog);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(39);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 554160336908868L) != 0)) {
				{
				{
				setState(36);
				statement();
				}
				}
				setState(41);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(42);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class StatementContext extends ParserRuleContext {
		public VarDeclarationContext varDeclaration() {
			return getRuleContext(VarDeclarationContext.class,0);
		}
		public FunctionDeclarationContext functionDeclaration() {
			return getRuleContext(FunctionDeclarationContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ReturnStatementContext returnStatement() {
			return getRuleContext(ReturnStatementContext.class,0);
		}
		public IfStatementContext ifStatement() {
			return getRuleContext(IfStatementContext.class,0);
		}
		public BlockStatementContext blockStatement() {
			return getRuleContext(BlockStatementContext.class,0);
		}
		public WhileLoopContext whileLoop() {
			return getRuleContext(WhileLoopContext.class,0);
		}
		public BreakStatementContext breakStatement() {
			return getRuleContext(BreakStatementContext.class,0);
		}
		public ContinueStatementContext continueStatement() {
			return getRuleContext(ContinueStatementContext.class,0);
		}
		public StatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statement; }
	}

	public final StatementContext statement() throws RecognitionException {
		StatementContext _localctx = new StatementContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_statement);
		try {
			setState(55);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
				enterOuterAlt(_localctx, 1);
				{
				setState(44);
				varDeclaration();
				}
				break;
			case T__5:
				enterOuterAlt(_localctx, 2);
				{
				setState(45);
				functionDeclaration();
				}
				break;
			case T__8:
			case T__24:
			case T__30:
			case T__31:
			case T__42:
			case BOOL:
			case INT:
			case FLOAT:
			case STRING:
			case IDENTIFIER:
				enterOuterAlt(_localctx, 3);
				{
				setState(46);
				expression(0);
				setState(47);
				match(T__0);
				}
				break;
			case T__11:
				enterOuterAlt(_localctx, 4);
				{
				setState(49);
				returnStatement();
				}
				break;
			case T__12:
				enterOuterAlt(_localctx, 5);
				{
				setState(50);
				ifStatement();
				}
				break;
			case T__17:
				enterOuterAlt(_localctx, 6);
				{
				setState(51);
				blockStatement();
				}
				break;
			case T__14:
				enterOuterAlt(_localctx, 7);
				{
				setState(52);
				whileLoop();
				}
				break;
			case T__15:
				enterOuterAlt(_localctx, 8);
				{
				setState(53);
				breakStatement();
				}
				break;
			case T__16:
				enterOuterAlt(_localctx, 9);
				{
				setState(54);
				continueStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class VarDeclarationContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(RustParser.IDENTIFIER, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public VarDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_varDeclaration; }
	}

	public final VarDeclarationContext varDeclaration() throws RecognitionException {
		VarDeclarationContext _localctx = new VarDeclarationContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_varDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(57);
			match(T__1);
			setState(59);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__2) {
				{
				setState(58);
				match(T__2);
				}
			}

			setState(61);
			match(IDENTIFIER);
			setState(64);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__3) {
				{
				setState(62);
				match(T__3);
				setState(63);
				type();
				}
			}

			setState(68);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__4) {
				{
				setState(66);
				match(T__4);
				setState(67);
				expression(0);
				}
			}

			setState(70);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FunctionDeclarationContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(RustParser.IDENTIFIER, 0); }
		public BlockStatementContext blockStatement() {
			return getRuleContext(BlockStatementContext.class,0);
		}
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
		}
		public FunctionDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionDeclaration; }
	}

	public final FunctionDeclarationContext functionDeclaration() throws RecognitionException {
		FunctionDeclarationContext _localctx = new FunctionDeclarationContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_functionDeclaration);
		int _la;
		try {
			setState(91);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(72);
				match(T__5);
				setState(73);
				match(IDENTIFIER);
				setState(74);
				match(T__6);
				setState(77);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__7) {
					{
					setState(75);
					match(T__7);
					setState(76);
					type();
					}
				}

				setState(79);
				blockStatement();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(80);
				match(T__5);
				setState(81);
				match(IDENTIFIER);
				setState(82);
				match(T__8);
				setState(83);
				parameterList();
				setState(84);
				match(T__9);
				setState(87);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__7) {
					{
					setState(85);
					match(T__7);
					setState(86);
					type();
					}
				}

				setState(89);
				blockStatement();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ParameterListContext extends ParserRuleContext {
		public List<ParameterContext> parameter() {
			return getRuleContexts(ParameterContext.class);
		}
		public ParameterContext parameter(int i) {
			return getRuleContext(ParameterContext.class,i);
		}
		public ParameterListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameterList; }
	}

	public final ParameterListContext parameterList() throws RecognitionException {
		ParameterListContext _localctx = new ParameterListContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_parameterList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(93);
			parameter();
			setState(98);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__10) {
				{
				{
				setState(94);
				match(T__10);
				setState(95);
				parameter();
				}
				}
				setState(100);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ParameterContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(RustParser.IDENTIFIER, 0); }
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public ParameterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameter; }
	}

	public final ParameterContext parameter() throws RecognitionException {
		ParameterContext _localctx = new ParameterContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_parameter);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(101);
			match(IDENTIFIER);
			setState(102);
			match(T__3);
			setState(103);
			type();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ReturnStatementContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ReturnStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_returnStatement; }
	}

	public final ReturnStatementContext returnStatement() throws RecognitionException {
		ReturnStatementContext _localctx = new ReturnStatementContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_returnStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(105);
			match(T__11);
			setState(107);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 554160336404992L) != 0)) {
				{
				setState(106);
				expression(0);
				}
			}

			setState(109);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IfStatementContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public List<BlockStatementContext> blockStatement() {
			return getRuleContexts(BlockStatementContext.class);
		}
		public BlockStatementContext blockStatement(int i) {
			return getRuleContext(BlockStatementContext.class,i);
		}
		public IfStatementContext ifStatement() {
			return getRuleContext(IfStatementContext.class,0);
		}
		public IfStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifStatement; }
	}

	public final IfStatementContext ifStatement() throws RecognitionException {
		IfStatementContext _localctx = new IfStatementContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_ifStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(111);
			match(T__12);
			setState(112);
			expression(0);
			setState(113);
			blockStatement();
			setState(119);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__13) {
				{
				setState(114);
				match(T__13);
				setState(117);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case T__12:
					{
					setState(115);
					ifStatement();
					}
					break;
				case T__17:
					{
					setState(116);
					blockStatement();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class WhileLoopContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public BlockStatementContext blockStatement() {
			return getRuleContext(BlockStatementContext.class,0);
		}
		public WhileLoopContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_whileLoop; }
	}

	public final WhileLoopContext whileLoop() throws RecognitionException {
		WhileLoopContext _localctx = new WhileLoopContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_whileLoop);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(121);
			match(T__14);
			setState(122);
			expression(0);
			setState(123);
			blockStatement();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BreakStatementContext extends ParserRuleContext {
		public BreakStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_breakStatement; }
	}

	public final BreakStatementContext breakStatement() throws RecognitionException {
		BreakStatementContext _localctx = new BreakStatementContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_breakStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(125);
			match(T__15);
			setState(126);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ContinueStatementContext extends ParserRuleContext {
		public ContinueStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_continueStatement; }
	}

	public final ContinueStatementContext continueStatement() throws RecognitionException {
		ContinueStatementContext _localctx = new ContinueStatementContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_continueStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(128);
			match(T__16);
			setState(129);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BlockStatementContext extends ParserRuleContext {
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public BlockStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_blockStatement; }
	}

	public final BlockStatementContext blockStatement() throws RecognitionException {
		BlockStatementContext _localctx = new BlockStatementContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_blockStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(131);
			match(T__17);
			setState(135);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 554160336908868L) != 0)) {
				{
				{
				setState(132);
				statement();
				}
				}
				setState(137);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(138);
			match(T__18);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TypeContext extends ParserRuleContext {
		public TypeContext type() {
			return getRuleContext(TypeContext.class,0);
		}
		public TypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_type; }
	}

	public final TypeContext type() throws RecognitionException {
		TypeContext _localctx = new TypeContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_type);
		try {
			setState(155);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__19:
				enterOuterAlt(_localctx, 1);
				{
				setState(140);
				match(T__19);
				}
				break;
			case T__20:
				enterOuterAlt(_localctx, 2);
				{
				setState(141);
				match(T__20);
				}
				break;
			case T__21:
				enterOuterAlt(_localctx, 3);
				{
				setState(142);
				match(T__21);
				}
				break;
			case T__22:
				enterOuterAlt(_localctx, 4);
				{
				setState(143);
				match(T__22);
				}
				break;
			case T__23:
				enterOuterAlt(_localctx, 5);
				{
				setState(144);
				match(T__23);
				}
				break;
			case T__6:
				enterOuterAlt(_localctx, 6);
				{
				setState(145);
				match(T__6);
				}
				break;
			case T__24:
				enterOuterAlt(_localctx, 7);
				{
				setState(146);
				match(T__24);
				setState(147);
				type();
				setState(148);
				match(T__25);
				}
				break;
			case T__26:
				enterOuterAlt(_localctx, 8);
				{
				setState(150);
				match(T__26);
				setState(151);
				match(T__27);
				setState(152);
				type();
				setState(153);
				match(T__28);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionContext extends ParserRuleContext {
		public Token op;
		public PrimaryContext primary() {
			return getRuleContext(PrimaryContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode IDENTIFIER() { return getToken(RustParser.IDENTIFIER, 0); }
		public ExpressionListContext expressionList() {
			return getRuleContext(ExpressionListContext.class,0);
		}
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 26;
		enterRecursionRule(_localctx, 26, RULE_expression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(161);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__8:
			case T__24:
			case T__42:
			case BOOL:
			case INT:
			case FLOAT:
			case STRING:
			case IDENTIFIER:
				{
				setState(158);
				primary();
				}
				break;
			case T__30:
			case T__31:
				{
				setState(159);
				_la = _input.LA(1);
				if ( !(_la==T__30 || _la==T__31) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(160);
				expression(8);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(215);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(213);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,19,_ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(163);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						setState(164);
						((ExpressionContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 60129542144L) != 0)) ) {
							((ExpressionContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(165);
						expression(8);
						}
						break;
					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(166);
						if (!(precpred(_ctx, 6))) throw new FailedPredicateException(this, "precpred(_ctx, 6)");
						setState(167);
						((ExpressionContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__31 || _la==T__35) ) {
							((ExpressionContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(168);
						expression(7);
						}
						break;
					case 3:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(169);
						if (!(precpred(_ctx, 5))) throw new FailedPredicateException(this, "precpred(_ctx, 5)");
						setState(170);
						((ExpressionContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 413122166784L) != 0)) ) {
							((ExpressionContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(171);
						expression(6);
						}
						break;
					case 4:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(172);
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
						setState(173);
						((ExpressionContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__38 || _la==T__39) ) {
							((ExpressionContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(174);
						expression(5);
						}
						break;
					case 5:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(175);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(176);
						match(T__40);
						setState(177);
						expression(4);
						}
						break;
					case 6:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(178);
						if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
						setState(179);
						match(T__41);
						setState(180);
						expression(3);
						}
						break;
					case 7:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(181);
						if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
						setState(182);
						match(T__4);
						setState(183);
						expression(2);
						}
						break;
					case 8:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(184);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						setState(185);
						match(T__29);
						setState(186);
						match(IDENTIFIER);
						setState(192);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,16,_ctx) ) {
						case 1:
							{
							setState(187);
							match(T__8);
							setState(189);
							_errHandler.sync(this);
							_la = _input.LA(1);
							if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 554160336404992L) != 0)) {
								{
								setState(188);
								expressionList();
								}
							}

							setState(191);
							match(T__9);
							}
							break;
						}
						}
						break;
					case 9:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(194);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(195);
						match(T__29);
						setState(196);
						match(IDENTIFIER);
						setState(198);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,17,_ctx) ) {
						case 1:
							{
							setState(197);
							match(T__6);
							}
							break;
						}
						}
						break;
					case 10:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(200);
						if (!(precpred(_ctx, 11))) throw new FailedPredicateException(this, "precpred(_ctx, 11)");
						setState(201);
						match(T__24);
						setState(202);
						expression(0);
						setState(203);
						match(T__25);
						}
						break;
					case 11:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(205);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(206);
						match(T__8);
						setState(208);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 554160336404992L) != 0)) {
							{
							setState(207);
							expressionList();
							}
						}

						setState(210);
						match(T__9);
						}
						break;
					case 12:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(211);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(212);
						match(T__6);
						}
						break;
					}
					} 
				}
				setState(217);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PrimaryContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(RustParser.IDENTIFIER, 0); }
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ArrayLiteralContext arrayLiteral() {
			return getRuleContext(ArrayLiteralContext.class,0);
		}
		public PrimaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_primary; }
	}

	public final PrimaryContext primary() throws RecognitionException {
		PrimaryContext _localctx = new PrimaryContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_primary);
		try {
			setState(225);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDENTIFIER:
				enterOuterAlt(_localctx, 1);
				{
				setState(218);
				match(IDENTIFIER);
				}
				break;
			case BOOL:
			case INT:
			case FLOAT:
			case STRING:
				enterOuterAlt(_localctx, 2);
				{
				setState(219);
				literal();
				}
				break;
			case T__8:
				enterOuterAlt(_localctx, 3);
				{
				setState(220);
				match(T__8);
				setState(221);
				expression(0);
				setState(222);
				match(T__9);
				}
				break;
			case T__24:
			case T__42:
				enterOuterAlt(_localctx, 4);
				{
				setState(224);
				arrayLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArrayLiteralContext extends ParserRuleContext {
		public ExpressionListContext expressionList() {
			return getRuleContext(ExpressionListContext.class,0);
		}
		public ArrayLiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arrayLiteral; }
	}

	public final ArrayLiteralContext arrayLiteral() throws RecognitionException {
		ArrayLiteralContext _localctx = new ArrayLiteralContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_arrayLiteral);
		int _la;
		try {
			setState(238);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__24:
				enterOuterAlt(_localctx, 1);
				{
				setState(227);
				match(T__24);
				setState(229);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 554160336404992L) != 0)) {
					{
					setState(228);
					expressionList();
					}
				}

				setState(231);
				match(T__25);
				}
				break;
			case T__42:
				enterOuterAlt(_localctx, 2);
				{
				setState(232);
				match(T__42);
				setState(233);
				match(T__24);
				setState(235);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 554160336404992L) != 0)) {
					{
					setState(234);
					expressionList();
					}
				}

				setState(237);
				match(T__25);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionListContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ExpressionListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionList; }
	}

	public final ExpressionListContext expressionList() throws RecognitionException {
		ExpressionListContext _localctx = new ExpressionListContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_expressionList);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(240);
			expression(0);
			setState(245);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,25,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(241);
					match(T__10);
					setState(242);
					expression(0);
					}
					} 
				}
				setState(247);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,25,_ctx);
			}
			setState(249);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__10) {
				{
				setState(248);
				match(T__10);
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralContext extends ParserRuleContext {
		public TerminalNode INT() { return getToken(RustParser.INT, 0); }
		public TerminalNode FLOAT() { return getToken(RustParser.FLOAT, 0); }
		public TerminalNode STRING() { return getToken(RustParser.STRING, 0); }
		public TerminalNode BOOL() { return getToken(RustParser.BOOL, 0); }
		public LiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literal; }
	}

	public final LiteralContext literal() throws RecognitionException {
		LiteralContext _localctx = new LiteralContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_literal);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(251);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 263882790666240L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 13:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 7);
		case 1:
			return precpred(_ctx, 6);
		case 2:
			return precpred(_ctx, 5);
		case 3:
			return precpred(_ctx, 4);
		case 4:
			return precpred(_ctx, 3);
		case 5:
			return precpred(_ctx, 2);
		case 6:
			return precpred(_ctx, 1);
		case 7:
			return precpred(_ctx, 13);
		case 8:
			return precpred(_ctx, 12);
		case 9:
			return precpred(_ctx, 11);
		case 10:
			return precpred(_ctx, 10);
		case 11:
			return precpred(_ctx, 9);
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u00013\u00fe\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007\u000f"+
		"\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0001\u0000\u0005\u0000"+
		"&\b\u0000\n\u0000\f\u0000)\t\u0000\u0001\u0000\u0001\u0000\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0003\u00018\b\u0001"+
		"\u0001\u0002\u0001\u0002\u0003\u0002<\b\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0003\u0002A\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002"+
		"E\b\u0002\u0001\u0002\u0001\u0002\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0003\u0003N\b\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0003\u0003X\b\u0003\u0001\u0003\u0001\u0003\u0003\u0003\\\b\u0003\u0001"+
		"\u0004\u0001\u0004\u0001\u0004\u0005\u0004a\b\u0004\n\u0004\f\u0004d\t"+
		"\u0004\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0006\u0001"+
		"\u0006\u0003\u0006l\b\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0003\u0007v\b"+
		"\u0007\u0003\u0007x\b\u0007\u0001\b\u0001\b\u0001\b\u0001\b\u0001\t\u0001"+
		"\t\u0001\t\u0001\n\u0001\n\u0001\n\u0001\u000b\u0001\u000b\u0005\u000b"+
		"\u0086\b\u000b\n\u000b\f\u000b\u0089\t\u000b\u0001\u000b\u0001\u000b\u0001"+
		"\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001"+
		"\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u009c\b\f\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0003\r\u00a2\b\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0003\r\u00be\b\r\u0001\r\u0003\r\u00c1\b\r"+
		"\u0001\r\u0001\r\u0001\r\u0001\r\u0003\r\u00c7\b\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0003\r\u00d1\b\r\u0001\r\u0001"+
		"\r\u0001\r\u0005\r\u00d6\b\r\n\r\f\r\u00d9\t\r\u0001\u000e\u0001\u000e"+
		"\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0003\u000e"+
		"\u00e2\b\u000e\u0001\u000f\u0001\u000f\u0003\u000f\u00e6\b\u000f\u0001"+
		"\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0003\u000f\u00ec\b\u000f\u0001"+
		"\u000f\u0003\u000f\u00ef\b\u000f\u0001\u0010\u0001\u0010\u0001\u0010\u0005"+
		"\u0010\u00f4\b\u0010\n\u0010\f\u0010\u00f7\t\u0010\u0001\u0010\u0003\u0010"+
		"\u00fa\b\u0010\u0001\u0011\u0001\u0011\u0001\u0011\u0000\u0001\u001a\u0012"+
		"\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a"+
		"\u001c\u001e \"\u0000\u0006\u0001\u0000\u001f \u0001\u0000!#\u0002\u0000"+
		"  $$\u0002\u0000\u001c\u001d%&\u0001\u0000\'(\u0001\u0000,/\u011f\u0000"+
		"\'\u0001\u0000\u0000\u0000\u00027\u0001\u0000\u0000\u0000\u00049\u0001"+
		"\u0000\u0000\u0000\u0006[\u0001\u0000\u0000\u0000\b]\u0001\u0000\u0000"+
		"\u0000\ne\u0001\u0000\u0000\u0000\fi\u0001\u0000\u0000\u0000\u000eo\u0001"+
		"\u0000\u0000\u0000\u0010y\u0001\u0000\u0000\u0000\u0012}\u0001\u0000\u0000"+
		"\u0000\u0014\u0080\u0001\u0000\u0000\u0000\u0016\u0083\u0001\u0000\u0000"+
		"\u0000\u0018\u009b\u0001\u0000\u0000\u0000\u001a\u00a1\u0001\u0000\u0000"+
		"\u0000\u001c\u00e1\u0001\u0000\u0000\u0000\u001e\u00ee\u0001\u0000\u0000"+
		"\u0000 \u00f0\u0001\u0000\u0000\u0000\"\u00fb\u0001\u0000\u0000\u0000"+
		"$&\u0003\u0002\u0001\u0000%$\u0001\u0000\u0000\u0000&)\u0001\u0000\u0000"+
		"\u0000\'%\u0001\u0000\u0000\u0000\'(\u0001\u0000\u0000\u0000(*\u0001\u0000"+
		"\u0000\u0000)\'\u0001\u0000\u0000\u0000*+\u0005\u0000\u0000\u0001+\u0001"+
		"\u0001\u0000\u0000\u0000,8\u0003\u0004\u0002\u0000-8\u0003\u0006\u0003"+
		"\u0000./\u0003\u001a\r\u0000/0\u0005\u0001\u0000\u000008\u0001\u0000\u0000"+
		"\u000018\u0003\f\u0006\u000028\u0003\u000e\u0007\u000038\u0003\u0016\u000b"+
		"\u000048\u0003\u0010\b\u000058\u0003\u0012\t\u000068\u0003\u0014\n\u0000"+
		"7,\u0001\u0000\u0000\u00007-\u0001\u0000\u0000\u00007.\u0001\u0000\u0000"+
		"\u000071\u0001\u0000\u0000\u000072\u0001\u0000\u0000\u000073\u0001\u0000"+
		"\u0000\u000074\u0001\u0000\u0000\u000075\u0001\u0000\u0000\u000076\u0001"+
		"\u0000\u0000\u00008\u0003\u0001\u0000\u0000\u00009;\u0005\u0002\u0000"+
		"\u0000:<\u0005\u0003\u0000\u0000;:\u0001\u0000\u0000\u0000;<\u0001\u0000"+
		"\u0000\u0000<=\u0001\u0000\u0000\u0000=@\u00050\u0000\u0000>?\u0005\u0004"+
		"\u0000\u0000?A\u0003\u0018\f\u0000@>\u0001\u0000\u0000\u0000@A\u0001\u0000"+
		"\u0000\u0000AD\u0001\u0000\u0000\u0000BC\u0005\u0005\u0000\u0000CE\u0003"+
		"\u001a\r\u0000DB\u0001\u0000\u0000\u0000DE\u0001\u0000\u0000\u0000EF\u0001"+
		"\u0000\u0000\u0000FG\u0005\u0001\u0000\u0000G\u0005\u0001\u0000\u0000"+
		"\u0000HI\u0005\u0006\u0000\u0000IJ\u00050\u0000\u0000JM\u0005\u0007\u0000"+
		"\u0000KL\u0005\b\u0000\u0000LN\u0003\u0018\f\u0000MK\u0001\u0000\u0000"+
		"\u0000MN\u0001\u0000\u0000\u0000NO\u0001\u0000\u0000\u0000O\\\u0003\u0016"+
		"\u000b\u0000PQ\u0005\u0006\u0000\u0000QR\u00050\u0000\u0000RS\u0005\t"+
		"\u0000\u0000ST\u0003\b\u0004\u0000TW\u0005\n\u0000\u0000UV\u0005\b\u0000"+
		"\u0000VX\u0003\u0018\f\u0000WU\u0001\u0000\u0000\u0000WX\u0001\u0000\u0000"+
		"\u0000XY\u0001\u0000\u0000\u0000YZ\u0003\u0016\u000b\u0000Z\\\u0001\u0000"+
		"\u0000\u0000[H\u0001\u0000\u0000\u0000[P\u0001\u0000\u0000\u0000\\\u0007"+
		"\u0001\u0000\u0000\u0000]b\u0003\n\u0005\u0000^_\u0005\u000b\u0000\u0000"+
		"_a\u0003\n\u0005\u0000`^\u0001\u0000\u0000\u0000ad\u0001\u0000\u0000\u0000"+
		"b`\u0001\u0000\u0000\u0000bc\u0001\u0000\u0000\u0000c\t\u0001\u0000\u0000"+
		"\u0000db\u0001\u0000\u0000\u0000ef\u00050\u0000\u0000fg\u0005\u0004\u0000"+
		"\u0000gh\u0003\u0018\f\u0000h\u000b\u0001\u0000\u0000\u0000ik\u0005\f"+
		"\u0000\u0000jl\u0003\u001a\r\u0000kj\u0001\u0000\u0000\u0000kl\u0001\u0000"+
		"\u0000\u0000lm\u0001\u0000\u0000\u0000mn\u0005\u0001\u0000\u0000n\r\u0001"+
		"\u0000\u0000\u0000op\u0005\r\u0000\u0000pq\u0003\u001a\r\u0000qw\u0003"+
		"\u0016\u000b\u0000ru\u0005\u000e\u0000\u0000sv\u0003\u000e\u0007\u0000"+
		"tv\u0003\u0016\u000b\u0000us\u0001\u0000\u0000\u0000ut\u0001\u0000\u0000"+
		"\u0000vx\u0001\u0000\u0000\u0000wr\u0001\u0000\u0000\u0000wx\u0001\u0000"+
		"\u0000\u0000x\u000f\u0001\u0000\u0000\u0000yz\u0005\u000f\u0000\u0000"+
		"z{\u0003\u001a\r\u0000{|\u0003\u0016\u000b\u0000|\u0011\u0001\u0000\u0000"+
		"\u0000}~\u0005\u0010\u0000\u0000~\u007f\u0005\u0001\u0000\u0000\u007f"+
		"\u0013\u0001\u0000\u0000\u0000\u0080\u0081\u0005\u0011\u0000\u0000\u0081"+
		"\u0082\u0005\u0001\u0000\u0000\u0082\u0015\u0001\u0000\u0000\u0000\u0083"+
		"\u0087\u0005\u0012\u0000\u0000\u0084\u0086\u0003\u0002\u0001\u0000\u0085"+
		"\u0084\u0001\u0000\u0000\u0000\u0086\u0089\u0001\u0000\u0000\u0000\u0087"+
		"\u0085\u0001\u0000\u0000\u0000\u0087\u0088\u0001\u0000\u0000\u0000\u0088"+
		"\u008a\u0001\u0000\u0000\u0000\u0089\u0087\u0001\u0000\u0000\u0000\u008a"+
		"\u008b\u0005\u0013\u0000\u0000\u008b\u0017\u0001\u0000\u0000\u0000\u008c"+
		"\u009c\u0005\u0014\u0000\u0000\u008d\u009c\u0005\u0015\u0000\u0000\u008e"+
		"\u009c\u0005\u0016\u0000\u0000\u008f\u009c\u0005\u0017\u0000\u0000\u0090"+
		"\u009c\u0005\u0018\u0000\u0000\u0091\u009c\u0005\u0007\u0000\u0000\u0092"+
		"\u0093\u0005\u0019\u0000\u0000\u0093\u0094\u0003\u0018\f\u0000\u0094\u0095"+
		"\u0005\u001a\u0000\u0000\u0095\u009c\u0001\u0000\u0000\u0000\u0096\u0097"+
		"\u0005\u001b\u0000\u0000\u0097\u0098\u0005\u001c\u0000\u0000\u0098\u0099"+
		"\u0003\u0018\f\u0000\u0099\u009a\u0005\u001d\u0000\u0000\u009a\u009c\u0001"+
		"\u0000\u0000\u0000\u009b\u008c\u0001\u0000\u0000\u0000\u009b\u008d\u0001"+
		"\u0000\u0000\u0000\u009b\u008e\u0001\u0000\u0000\u0000\u009b\u008f\u0001"+
		"\u0000\u0000\u0000\u009b\u0090\u0001\u0000\u0000\u0000\u009b\u0091\u0001"+
		"\u0000\u0000\u0000\u009b\u0092\u0001\u0000\u0000\u0000\u009b\u0096\u0001"+
		"\u0000\u0000\u0000\u009c\u0019\u0001\u0000\u0000\u0000\u009d\u009e\u0006"+
		"\r\uffff\uffff\u0000\u009e\u00a2\u0003\u001c\u000e\u0000\u009f\u00a0\u0007"+
		"\u0000\u0000\u0000\u00a0\u00a2\u0003\u001a\r\b\u00a1\u009d\u0001\u0000"+
		"\u0000\u0000\u00a1\u009f\u0001\u0000\u0000\u0000\u00a2\u00d7\u0001\u0000"+
		"\u0000\u0000\u00a3\u00a4\n\u0007\u0000\u0000\u00a4\u00a5\u0007\u0001\u0000"+
		"\u0000\u00a5\u00d6\u0003\u001a\r\b\u00a6\u00a7\n\u0006\u0000\u0000\u00a7"+
		"\u00a8\u0007\u0002\u0000\u0000\u00a8\u00d6\u0003\u001a\r\u0007\u00a9\u00aa"+
		"\n\u0005\u0000\u0000\u00aa\u00ab\u0007\u0003\u0000\u0000\u00ab\u00d6\u0003"+
		"\u001a\r\u0006\u00ac\u00ad\n\u0004\u0000\u0000\u00ad\u00ae\u0007\u0004"+
		"\u0000\u0000\u00ae\u00d6\u0003\u001a\r\u0005\u00af\u00b0\n\u0003\u0000"+
		"\u0000\u00b0\u00b1\u0005)\u0000\u0000\u00b1\u00d6\u0003\u001a\r\u0004"+
		"\u00b2\u00b3\n\u0002\u0000\u0000\u00b3\u00b4\u0005*\u0000\u0000\u00b4"+
		"\u00d6\u0003\u001a\r\u0003\u00b5\u00b6\n\u0001\u0000\u0000\u00b6\u00b7"+
		"\u0005\u0005\u0000\u0000\u00b7\u00d6\u0003\u001a\r\u0002\u00b8\u00b9\n"+
		"\r\u0000\u0000\u00b9\u00ba\u0005\u001e\u0000\u0000\u00ba\u00c0\u00050"+
		"\u0000\u0000\u00bb\u00bd\u0005\t\u0000\u0000\u00bc\u00be\u0003 \u0010"+
		"\u0000\u00bd\u00bc\u0001\u0000\u0000\u0000\u00bd\u00be\u0001\u0000\u0000"+
		"\u0000\u00be\u00bf\u0001\u0000\u0000\u0000\u00bf\u00c1\u0005\n\u0000\u0000"+
		"\u00c0\u00bb\u0001\u0000\u0000\u0000\u00c0\u00c1\u0001\u0000\u0000\u0000"+
		"\u00c1\u00d6\u0001\u0000\u0000\u0000\u00c2\u00c3\n\f\u0000\u0000\u00c3"+
		"\u00c4\u0005\u001e\u0000\u0000\u00c4\u00c6\u00050\u0000\u0000\u00c5\u00c7"+
		"\u0005\u0007\u0000\u0000\u00c6\u00c5\u0001\u0000\u0000\u0000\u00c6\u00c7"+
		"\u0001\u0000\u0000\u0000\u00c7\u00d6\u0001\u0000\u0000\u0000\u00c8\u00c9"+
		"\n\u000b\u0000\u0000\u00c9\u00ca\u0005\u0019\u0000\u0000\u00ca\u00cb\u0003"+
		"\u001a\r\u0000\u00cb\u00cc\u0005\u001a\u0000\u0000\u00cc\u00d6\u0001\u0000"+
		"\u0000\u0000\u00cd\u00ce\n\n\u0000\u0000\u00ce\u00d0\u0005\t\u0000\u0000"+
		"\u00cf\u00d1\u0003 \u0010\u0000\u00d0\u00cf\u0001\u0000\u0000\u0000\u00d0"+
		"\u00d1\u0001\u0000\u0000\u0000\u00d1\u00d2\u0001\u0000\u0000\u0000\u00d2"+
		"\u00d6\u0005\n\u0000\u0000\u00d3\u00d4\n\t\u0000\u0000\u00d4\u00d6\u0005"+
		"\u0007\u0000\u0000\u00d5\u00a3\u0001\u0000\u0000\u0000\u00d5\u00a6\u0001"+
		"\u0000\u0000\u0000\u00d5\u00a9\u0001\u0000\u0000\u0000\u00d5\u00ac\u0001"+
		"\u0000\u0000\u0000\u00d5\u00af\u0001\u0000\u0000\u0000\u00d5\u00b2\u0001"+
		"\u0000\u0000\u0000\u00d5\u00b5\u0001\u0000\u0000\u0000\u00d5\u00b8\u0001"+
		"\u0000\u0000\u0000\u00d5\u00c2\u0001\u0000\u0000\u0000\u00d5\u00c8\u0001"+
		"\u0000\u0000\u0000\u00d5\u00cd\u0001\u0000\u0000\u0000\u00d5\u00d3\u0001"+
		"\u0000\u0000\u0000\u00d6\u00d9\u0001\u0000\u0000\u0000\u00d7\u00d5\u0001"+
		"\u0000\u0000\u0000\u00d7\u00d8\u0001\u0000\u0000\u0000\u00d8\u001b\u0001"+
		"\u0000\u0000\u0000\u00d9\u00d7\u0001\u0000\u0000\u0000\u00da\u00e2\u0005"+
		"0\u0000\u0000\u00db\u00e2\u0003\"\u0011\u0000\u00dc\u00dd\u0005\t\u0000"+
		"\u0000\u00dd\u00de\u0003\u001a\r\u0000\u00de\u00df\u0005\n\u0000\u0000"+
		"\u00df\u00e2\u0001\u0000\u0000\u0000\u00e0\u00e2\u0003\u001e\u000f\u0000"+
		"\u00e1\u00da\u0001\u0000\u0000\u0000\u00e1\u00db\u0001\u0000\u0000\u0000"+
		"\u00e1\u00dc\u0001\u0000\u0000\u0000\u00e1\u00e0\u0001\u0000\u0000\u0000"+
		"\u00e2\u001d\u0001\u0000\u0000\u0000\u00e3\u00e5\u0005\u0019\u0000\u0000"+
		"\u00e4\u00e6\u0003 \u0010\u0000\u00e5\u00e4\u0001\u0000\u0000\u0000\u00e5"+
		"\u00e6\u0001\u0000\u0000\u0000\u00e6\u00e7\u0001\u0000\u0000\u0000\u00e7"+
		"\u00ef\u0005\u001a\u0000\u0000\u00e8\u00e9\u0005+\u0000\u0000\u00e9\u00eb"+
		"\u0005\u0019\u0000\u0000\u00ea\u00ec\u0003 \u0010\u0000\u00eb\u00ea\u0001"+
		"\u0000\u0000\u0000\u00eb\u00ec\u0001\u0000\u0000\u0000\u00ec\u00ed\u0001"+
		"\u0000\u0000\u0000\u00ed\u00ef\u0005\u001a\u0000\u0000\u00ee\u00e3\u0001"+
		"\u0000\u0000\u0000\u00ee\u00e8\u0001\u0000\u0000\u0000\u00ef\u001f\u0001"+
		"\u0000\u0000\u0000\u00f0\u00f5\u0003\u001a\r\u0000\u00f1\u00f2\u0005\u000b"+
		"\u0000\u0000\u00f2\u00f4\u0003\u001a\r\u0000\u00f3\u00f1\u0001\u0000\u0000"+
		"\u0000\u00f4\u00f7\u0001\u0000\u0000\u0000\u00f5\u00f3\u0001\u0000\u0000"+
		"\u0000\u00f5\u00f6\u0001\u0000\u0000\u0000\u00f6\u00f9\u0001\u0000\u0000"+
		"\u0000\u00f7\u00f5\u0001\u0000\u0000\u0000\u00f8\u00fa\u0005\u000b\u0000"+
		"\u0000\u00f9\u00f8\u0001\u0000\u0000\u0000\u00f9\u00fa\u0001\u0000\u0000"+
		"\u0000\u00fa!\u0001\u0000\u0000\u0000\u00fb\u00fc\u0007\u0005\u0000\u0000"+
		"\u00fc#\u0001\u0000\u0000\u0000\u001b\'7;@DMW[bkuw\u0087\u009b\u00a1\u00bd"+
		"\u00c0\u00c6\u00d0\u00d5\u00d7\u00e1\u00e5\u00eb\u00ee\u00f5\u00f9";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}