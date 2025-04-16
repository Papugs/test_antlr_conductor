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
		T__38=39, T__39=40, T__40=41, T__41=42, T__42=43, T__43=44, T__44=45, 
		T__45=46, T__46=47, T__47=48, BOOL=49, INT=50, FLOAT=51, STRING=52, BUILTIN=53, 
		IDENTIFIER=54, COMMENT=55, BLOCK_COMMENT=56, WS=57;
	public static final int
		RULE_prog = 0, RULE_statement = 1, RULE_varDeclaration = 2, RULE_functionDeclaration = 3, 
		RULE_parameterList = 4, RULE_parameter = 5, RULE_returnStatement = 6, 
		RULE_ifStatement = 7, RULE_whileLoop = 8, RULE_breakStatement = 9, RULE_continueStatement = 10, 
		RULE_blockStatement = 11, RULE_type = 12, RULE_expression = 13, RULE_primary = 14, 
		RULE_arrayLiteral = 15, RULE_macroInvocation = 16, RULE_macroArguments = 17, 
		RULE_expressionList = 18, RULE_literal = 19;
	private static String[] makeRuleNames() {
		return new String[] {
			"prog", "statement", "varDeclaration", "functionDeclaration", "parameterList", 
			"parameter", "returnStatement", "ifStatement", "whileLoop", "breakStatement", 
			"continueStatement", "blockStatement", "type", "expression", "primary", 
			"arrayLiteral", "macroInvocation", "macroArguments", "expressionList", 
			"literal"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "';'", "'let'", "'mut'", "':'", "'='", "'fn'", "'('", "')'", "'()'", 
			"'->'", "','", "'return'", "'if'", "'else'", "'while'", "'break'", "'continue'", 
			"'{'", "'}'", "'i32'", "'f64'", "'bool'", "'String'", "'&str'", "'['", 
			"']'", "'Vec'", "'<'", "'>'", "'.'", "'!'", "'-'", "'+='", "'-='", "'*='", 
			"'/='", "'%='", "'*'", "'/'", "'%'", "'+'", "'<='", "'>='", "'=='", "'!='", 
			"'&&'", "'||'", "'vec!'", null, null, null, null, "'println'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, "BOOL", "INT", "FLOAT", "STRING", "BUILTIN", "IDENTIFIER", "COMMENT", 
			"BLOCK_COMMENT", "WS"
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
			setState(43);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 35747328518762692L) != 0)) {
				{
				{
				setState(40);
				statement();
				}
				}
				setState(45);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(46);
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
			setState(59);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
				enterOuterAlt(_localctx, 1);
				{
				setState(48);
				varDeclaration();
				}
				break;
			case T__5:
				enterOuterAlt(_localctx, 2);
				{
				setState(49);
				functionDeclaration();
				}
				break;
			case T__6:
			case T__24:
			case T__30:
			case T__31:
			case T__47:
			case BOOL:
			case INT:
			case FLOAT:
			case STRING:
			case BUILTIN:
			case IDENTIFIER:
				enterOuterAlt(_localctx, 3);
				{
				setState(50);
				expression(0);
				setState(51);
				match(T__0);
				}
				break;
			case T__11:
				enterOuterAlt(_localctx, 4);
				{
				setState(53);
				returnStatement();
				}
				break;
			case T__12:
				enterOuterAlt(_localctx, 5);
				{
				setState(54);
				ifStatement();
				}
				break;
			case T__17:
				enterOuterAlt(_localctx, 6);
				{
				setState(55);
				blockStatement();
				}
				break;
			case T__14:
				enterOuterAlt(_localctx, 7);
				{
				setState(56);
				whileLoop();
				}
				break;
			case T__15:
				enterOuterAlt(_localctx, 8);
				{
				setState(57);
				breakStatement();
				}
				break;
			case T__16:
				enterOuterAlt(_localctx, 9);
				{
				setState(58);
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
			setState(61);
			match(T__1);
			setState(63);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__2) {
				{
				setState(62);
				match(T__2);
				}
			}

			setState(65);
			match(IDENTIFIER);
			setState(68);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__3) {
				{
				setState(66);
				match(T__3);
				setState(67);
				type();
				}
			}

			setState(72);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__4) {
				{
				setState(70);
				match(T__4);
				setState(71);
				expression(0);
				}
			}

			setState(74);
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
			enterOuterAlt(_localctx, 1);
			{
			setState(76);
			match(T__5);
			setState(77);
			match(IDENTIFIER);
			setState(84);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__6:
				{
				setState(78);
				match(T__6);
				setState(80);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==IDENTIFIER) {
					{
					setState(79);
					parameterList();
					}
				}

				setState(82);
				match(T__7);
				}
				break;
			case T__8:
				{
				setState(83);
				match(T__8);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(88);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__9) {
				{
				setState(86);
				match(T__9);
				setState(87);
				type();
				}
			}

			setState(90);
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
			setState(92);
			parameter();
			setState(97);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__10) {
				{
				{
				setState(93);
				match(T__10);
				setState(94);
				parameter();
				}
				}
				setState(99);
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
			setState(100);
			match(IDENTIFIER);
			setState(101);
			match(T__3);
			setState(102);
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
			setState(104);
			match(T__11);
			setState(106);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 35747328518258816L) != 0)) {
				{
				setState(105);
				expression(0);
				}
			}

			setState(108);
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
			setState(110);
			match(T__12);
			setState(111);
			expression(0);
			setState(112);
			blockStatement();
			setState(118);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__13) {
				{
				setState(113);
				match(T__13);
				setState(116);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case T__12:
					{
					setState(114);
					ifStatement();
					}
					break;
				case T__17:
					{
					setState(115);
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
			setState(120);
			match(T__14);
			setState(121);
			expression(0);
			setState(122);
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
			setState(124);
			match(T__15);
			setState(125);
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
			setState(127);
			match(T__16);
			setState(128);
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
			setState(130);
			match(T__17);
			setState(134);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 35747328518762692L) != 0)) {
				{
				{
				setState(131);
				statement();
				}
				}
				setState(136);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(137);
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
			setState(154);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__19:
				enterOuterAlt(_localctx, 1);
				{
				setState(139);
				match(T__19);
				}
				break;
			case T__20:
				enterOuterAlt(_localctx, 2);
				{
				setState(140);
				match(T__20);
				}
				break;
			case T__21:
				enterOuterAlt(_localctx, 3);
				{
				setState(141);
				match(T__21);
				}
				break;
			case T__22:
				enterOuterAlt(_localctx, 4);
				{
				setState(142);
				match(T__22);
				}
				break;
			case T__23:
				enterOuterAlt(_localctx, 5);
				{
				setState(143);
				match(T__23);
				}
				break;
			case T__8:
				enterOuterAlt(_localctx, 6);
				{
				setState(144);
				match(T__8);
				}
				break;
			case T__24:
				enterOuterAlt(_localctx, 7);
				{
				setState(145);
				match(T__24);
				setState(146);
				type();
				setState(147);
				match(T__25);
				}
				break;
			case T__26:
				enterOuterAlt(_localctx, 8);
				{
				setState(149);
				match(T__26);
				setState(150);
				match(T__27);
				setState(151);
				type();
				setState(152);
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
			setState(160);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__6:
			case T__24:
			case T__47:
			case BOOL:
			case INT:
			case FLOAT:
			case STRING:
			case BUILTIN:
			case IDENTIFIER:
				{
				setState(157);
				primary();
				}
				break;
			case T__30:
			case T__31:
				{
				setState(158);
				_la = _input.LA(1);
				if ( !(_la==T__30 || _la==T__31) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(159);
				expression(9);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(213);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(211);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,19,_ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(162);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(163);
						((ExpressionContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 266287972352L) != 0)) ) {
							((ExpressionContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(164);
						expression(9);
						}
						break;
					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(165);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						setState(166);
						((ExpressionContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 1924145348608L) != 0)) ) {
							((ExpressionContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(167);
						expression(8);
						}
						break;
					case 3:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(168);
						if (!(precpred(_ctx, 6))) throw new FailedPredicateException(this, "precpred(_ctx, 6)");
						setState(169);
						((ExpressionContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__31 || _la==T__40) ) {
							((ExpressionContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(170);
						expression(7);
						}
						break;
					case 4:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(171);
						if (!(precpred(_ctx, 5))) throw new FailedPredicateException(this, "precpred(_ctx, 5)");
						setState(172);
						((ExpressionContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 13194944839680L) != 0)) ) {
							((ExpressionContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(173);
						expression(6);
						}
						break;
					case 5:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(174);
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
						setState(175);
						((ExpressionContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__43 || _la==T__44) ) {
							((ExpressionContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(176);
						expression(5);
						}
						break;
					case 6:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(177);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(178);
						match(T__45);
						setState(179);
						expression(4);
						}
						break;
					case 7:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(180);
						if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
						setState(181);
						match(T__46);
						setState(182);
						expression(3);
						}
						break;
					case 8:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(183);
						if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
						setState(184);
						match(T__4);
						setState(185);
						expression(2);
						}
						break;
					case 9:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(186);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(187);
						match(T__29);
						setState(188);
						match(IDENTIFIER);
						setState(195);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,16,_ctx) ) {
						case 1:
							{
							setState(189);
							match(T__6);
							setState(191);
							_errHandler.sync(this);
							_la = _input.LA(1);
							if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 35747328518258816L) != 0)) {
								{
								setState(190);
								expressionList();
								}
							}

							setState(193);
							match(T__7);
							}
							break;
						case 2:
							{
							setState(194);
							match(T__8);
							}
							break;
						}
						}
						break;
					case 10:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(197);
						if (!(precpred(_ctx, 11))) throw new FailedPredicateException(this, "precpred(_ctx, 11)");
						setState(198);
						match(T__24);
						setState(199);
						expression(0);
						setState(200);
						match(T__25);
						}
						break;
					case 11:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(202);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(209);
						_errHandler.sync(this);
						switch (_input.LA(1)) {
						case T__6:
							{
							setState(203);
							match(T__6);
							setState(205);
							_errHandler.sync(this);
							_la = _input.LA(1);
							if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 35747328518258816L) != 0)) {
								{
								setState(204);
								expressionList();
								}
							}

							setState(207);
							match(T__7);
							}
							break;
						case T__8:
							{
							setState(208);
							match(T__8);
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						}
						break;
					}
					} 
				}
				setState(215);
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
		public MacroInvocationContext macroInvocation() {
			return getRuleContext(MacroInvocationContext.class,0);
		}
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
			setState(224);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BUILTIN:
				enterOuterAlt(_localctx, 1);
				{
				setState(216);
				macroInvocation();
				}
				break;
			case IDENTIFIER:
				enterOuterAlt(_localctx, 2);
				{
				setState(217);
				match(IDENTIFIER);
				}
				break;
			case BOOL:
			case INT:
			case FLOAT:
			case STRING:
				enterOuterAlt(_localctx, 3);
				{
				setState(218);
				literal();
				}
				break;
			case T__6:
				enterOuterAlt(_localctx, 4);
				{
				setState(219);
				match(T__6);
				setState(220);
				expression(0);
				setState(221);
				match(T__7);
				}
				break;
			case T__24:
			case T__47:
				enterOuterAlt(_localctx, 5);
				{
				setState(223);
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
			setState(237);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__24:
				enterOuterAlt(_localctx, 1);
				{
				setState(226);
				match(T__24);
				setState(228);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 35747328518258816L) != 0)) {
					{
					setState(227);
					expressionList();
					}
				}

				setState(230);
				match(T__25);
				}
				break;
			case T__47:
				enterOuterAlt(_localctx, 2);
				{
				setState(231);
				match(T__47);
				setState(232);
				match(T__24);
				setState(234);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 35747328518258816L) != 0)) {
					{
					setState(233);
					expressionList();
					}
				}

				setState(236);
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
	public static class MacroInvocationContext extends ParserRuleContext {
		public TerminalNode BUILTIN() { return getToken(RustParser.BUILTIN, 0); }
		public MacroArgumentsContext macroArguments() {
			return getRuleContext(MacroArgumentsContext.class,0);
		}
		public MacroInvocationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_macroInvocation; }
	}

	public final MacroInvocationContext macroInvocation() throws RecognitionException {
		MacroInvocationContext _localctx = new MacroInvocationContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_macroInvocation);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(239);
			match(BUILTIN);
			setState(240);
			match(T__30);
			setState(253);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__6:
				{
				setState(241);
				match(T__6);
				setState(242);
				macroArguments();
				setState(243);
				match(T__7);
				}
				break;
			case T__24:
				{
				setState(245);
				match(T__24);
				setState(246);
				macroArguments();
				setState(247);
				match(T__25);
				}
				break;
			case T__17:
				{
				setState(249);
				match(T__17);
				setState(250);
				macroArguments();
				setState(251);
				match(T__18);
				}
				break;
			default:
				throw new NoViableAltException(this);
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
	public static class MacroArgumentsContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> STRING() { return getTokens(RustParser.STRING); }
		public TerminalNode STRING(int i) {
			return getToken(RustParser.STRING, i);
		}
		public MacroArgumentsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_macroArguments; }
	}

	public final MacroArgumentsContext macroArguments() throws RecognitionException {
		MacroArgumentsContext _localctx = new MacroArgumentsContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_macroArguments);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(257);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,26,_ctx) ) {
			case 1:
				{
				setState(255);
				expression(0);
				}
				break;
			case 2:
				{
				setState(256);
				match(STRING);
				}
				break;
			}
			setState(266);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,28,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(259);
					match(T__10);
					setState(262);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,27,_ctx) ) {
					case 1:
						{
						setState(260);
						expression(0);
						}
						break;
					case 2:
						{
						setState(261);
						match(STRING);
						}
						break;
					}
					}
					} 
				}
				setState(268);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,28,_ctx);
			}
			setState(270);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__10) {
				{
				setState(269);
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
		enterRule(_localctx, 36, RULE_expressionList);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(272);
			expression(0);
			setState(277);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,30,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(273);
					match(T__10);
					setState(274);
					expression(0);
					}
					} 
				}
				setState(279);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,30,_ctx);
			}
			setState(281);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__10) {
				{
				setState(280);
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
		enterRule(_localctx, 38, RULE_literal);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(283);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 8444249301319680L) != 0)) ) {
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
			return precpred(_ctx, 8);
		case 1:
			return precpred(_ctx, 7);
		case 2:
			return precpred(_ctx, 6);
		case 3:
			return precpred(_ctx, 5);
		case 4:
			return precpred(_ctx, 4);
		case 5:
			return precpred(_ctx, 3);
		case 6:
			return precpred(_ctx, 2);
		case 7:
			return precpred(_ctx, 1);
		case 8:
			return precpred(_ctx, 12);
		case 9:
			return precpred(_ctx, 11);
		case 10:
			return precpred(_ctx, 10);
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u00019\u011e\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007\u000f"+
		"\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007\u0012"+
		"\u0002\u0013\u0007\u0013\u0001\u0000\u0005\u0000*\b\u0000\n\u0000\f\u0000"+
		"-\t\u0000\u0001\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0003\u0001<\b\u0001\u0001\u0002\u0001\u0002"+
		"\u0003\u0002@\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002"+
		"E\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002I\b\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003Q\b"+
		"\u0003\u0001\u0003\u0001\u0003\u0003\u0003U\b\u0003\u0001\u0003\u0001"+
		"\u0003\u0003\u0003Y\b\u0003\u0001\u0003\u0001\u0003\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0005\u0004`\b\u0004\n\u0004\f\u0004c\t\u0004\u0001"+
		"\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0006\u0001\u0006\u0003"+
		"\u0006k\b\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0003\u0007u\b\u0007\u0003"+
		"\u0007w\b\u0007\u0001\b\u0001\b\u0001\b\u0001\b\u0001\t\u0001\t\u0001"+
		"\t\u0001\n\u0001\n\u0001\n\u0001\u000b\u0001\u000b\u0005\u000b\u0085\b"+
		"\u000b\n\u000b\f\u000b\u0088\t\u000b\u0001\u000b\u0001\u000b\u0001\f\u0001"+
		"\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001\f\u0001"+
		"\f\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u009b\b\f\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0003\r\u00a1\b\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0003\r\u00c0\b\r\u0001\r\u0001"+
		"\r\u0003\r\u00c4\b\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0003\r\u00ce\b\r\u0001\r\u0001\r\u0003\r\u00d2\b\r\u0005\r"+
		"\u00d4\b\r\n\r\f\r\u00d7\t\r\u0001\u000e\u0001\u000e\u0001\u000e\u0001"+
		"\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0003\u000e\u00e1"+
		"\b\u000e\u0001\u000f\u0001\u000f\u0003\u000f\u00e5\b\u000f\u0001\u000f"+
		"\u0001\u000f\u0001\u000f\u0001\u000f\u0003\u000f\u00eb\b\u000f\u0001\u000f"+
		"\u0003\u000f\u00ee\b\u000f\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010"+
		"\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010"+
		"\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0003\u0010\u00fe\b\u0010"+
		"\u0001\u0011\u0001\u0011\u0003\u0011\u0102\b\u0011\u0001\u0011\u0001\u0011"+
		"\u0001\u0011\u0003\u0011\u0107\b\u0011\u0005\u0011\u0109\b\u0011\n\u0011"+
		"\f\u0011\u010c\t\u0011\u0001\u0011\u0003\u0011\u010f\b\u0011\u0001\u0012"+
		"\u0001\u0012\u0001\u0012\u0005\u0012\u0114\b\u0012\n\u0012\f\u0012\u0117"+
		"\t\u0012\u0001\u0012\u0003\u0012\u011a\b\u0012\u0001\u0013\u0001\u0013"+
		"\u0001\u0013\u0000\u0001\u001a\u0014\u0000\u0002\u0004\u0006\b\n\f\u000e"+
		"\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&\u0000\u0007\u0001"+
		"\u0000\u001f \u0001\u0000!%\u0001\u0000&(\u0002\u0000  ))\u0002\u0000"+
		"\u001c\u001d*+\u0001\u0000,-\u0001\u000014\u0144\u0000+\u0001\u0000\u0000"+
		"\u0000\u0002;\u0001\u0000\u0000\u0000\u0004=\u0001\u0000\u0000\u0000\u0006"+
		"L\u0001\u0000\u0000\u0000\b\\\u0001\u0000\u0000\u0000\nd\u0001\u0000\u0000"+
		"\u0000\fh\u0001\u0000\u0000\u0000\u000en\u0001\u0000\u0000\u0000\u0010"+
		"x\u0001\u0000\u0000\u0000\u0012|\u0001\u0000\u0000\u0000\u0014\u007f\u0001"+
		"\u0000\u0000\u0000\u0016\u0082\u0001\u0000\u0000\u0000\u0018\u009a\u0001"+
		"\u0000\u0000\u0000\u001a\u00a0\u0001\u0000\u0000\u0000\u001c\u00e0\u0001"+
		"\u0000\u0000\u0000\u001e\u00ed\u0001\u0000\u0000\u0000 \u00ef\u0001\u0000"+
		"\u0000\u0000\"\u0101\u0001\u0000\u0000\u0000$\u0110\u0001\u0000\u0000"+
		"\u0000&\u011b\u0001\u0000\u0000\u0000(*\u0003\u0002\u0001\u0000)(\u0001"+
		"\u0000\u0000\u0000*-\u0001\u0000\u0000\u0000+)\u0001\u0000\u0000\u0000"+
		"+,\u0001\u0000\u0000\u0000,.\u0001\u0000\u0000\u0000-+\u0001\u0000\u0000"+
		"\u0000./\u0005\u0000\u0000\u0001/\u0001\u0001\u0000\u0000\u00000<\u0003"+
		"\u0004\u0002\u00001<\u0003\u0006\u0003\u000023\u0003\u001a\r\u000034\u0005"+
		"\u0001\u0000\u00004<\u0001\u0000\u0000\u00005<\u0003\f\u0006\u00006<\u0003"+
		"\u000e\u0007\u00007<\u0003\u0016\u000b\u00008<\u0003\u0010\b\u00009<\u0003"+
		"\u0012\t\u0000:<\u0003\u0014\n\u0000;0\u0001\u0000\u0000\u0000;1\u0001"+
		"\u0000\u0000\u0000;2\u0001\u0000\u0000\u0000;5\u0001\u0000\u0000\u0000"+
		";6\u0001\u0000\u0000\u0000;7\u0001\u0000\u0000\u0000;8\u0001\u0000\u0000"+
		"\u0000;9\u0001\u0000\u0000\u0000;:\u0001\u0000\u0000\u0000<\u0003\u0001"+
		"\u0000\u0000\u0000=?\u0005\u0002\u0000\u0000>@\u0005\u0003\u0000\u0000"+
		"?>\u0001\u0000\u0000\u0000?@\u0001\u0000\u0000\u0000@A\u0001\u0000\u0000"+
		"\u0000AD\u00056\u0000\u0000BC\u0005\u0004\u0000\u0000CE\u0003\u0018\f"+
		"\u0000DB\u0001\u0000\u0000\u0000DE\u0001\u0000\u0000\u0000EH\u0001\u0000"+
		"\u0000\u0000FG\u0005\u0005\u0000\u0000GI\u0003\u001a\r\u0000HF\u0001\u0000"+
		"\u0000\u0000HI\u0001\u0000\u0000\u0000IJ\u0001\u0000\u0000\u0000JK\u0005"+
		"\u0001\u0000\u0000K\u0005\u0001\u0000\u0000\u0000LM\u0005\u0006\u0000"+
		"\u0000MT\u00056\u0000\u0000NP\u0005\u0007\u0000\u0000OQ\u0003\b\u0004"+
		"\u0000PO\u0001\u0000\u0000\u0000PQ\u0001\u0000\u0000\u0000QR\u0001\u0000"+
		"\u0000\u0000RU\u0005\b\u0000\u0000SU\u0005\t\u0000\u0000TN\u0001\u0000"+
		"\u0000\u0000TS\u0001\u0000\u0000\u0000UX\u0001\u0000\u0000\u0000VW\u0005"+
		"\n\u0000\u0000WY\u0003\u0018\f\u0000XV\u0001\u0000\u0000\u0000XY\u0001"+
		"\u0000\u0000\u0000YZ\u0001\u0000\u0000\u0000Z[\u0003\u0016\u000b\u0000"+
		"[\u0007\u0001\u0000\u0000\u0000\\a\u0003\n\u0005\u0000]^\u0005\u000b\u0000"+
		"\u0000^`\u0003\n\u0005\u0000_]\u0001\u0000\u0000\u0000`c\u0001\u0000\u0000"+
		"\u0000a_\u0001\u0000\u0000\u0000ab\u0001\u0000\u0000\u0000b\t\u0001\u0000"+
		"\u0000\u0000ca\u0001\u0000\u0000\u0000de\u00056\u0000\u0000ef\u0005\u0004"+
		"\u0000\u0000fg\u0003\u0018\f\u0000g\u000b\u0001\u0000\u0000\u0000hj\u0005"+
		"\f\u0000\u0000ik\u0003\u001a\r\u0000ji\u0001\u0000\u0000\u0000jk\u0001"+
		"\u0000\u0000\u0000kl\u0001\u0000\u0000\u0000lm\u0005\u0001\u0000\u0000"+
		"m\r\u0001\u0000\u0000\u0000no\u0005\r\u0000\u0000op\u0003\u001a\r\u0000"+
		"pv\u0003\u0016\u000b\u0000qt\u0005\u000e\u0000\u0000ru\u0003\u000e\u0007"+
		"\u0000su\u0003\u0016\u000b\u0000tr\u0001\u0000\u0000\u0000ts\u0001\u0000"+
		"\u0000\u0000uw\u0001\u0000\u0000\u0000vq\u0001\u0000\u0000\u0000vw\u0001"+
		"\u0000\u0000\u0000w\u000f\u0001\u0000\u0000\u0000xy\u0005\u000f\u0000"+
		"\u0000yz\u0003\u001a\r\u0000z{\u0003\u0016\u000b\u0000{\u0011\u0001\u0000"+
		"\u0000\u0000|}\u0005\u0010\u0000\u0000}~\u0005\u0001\u0000\u0000~\u0013"+
		"\u0001\u0000\u0000\u0000\u007f\u0080\u0005\u0011\u0000\u0000\u0080\u0081"+
		"\u0005\u0001\u0000\u0000\u0081\u0015\u0001\u0000\u0000\u0000\u0082\u0086"+
		"\u0005\u0012\u0000\u0000\u0083\u0085\u0003\u0002\u0001\u0000\u0084\u0083"+
		"\u0001\u0000\u0000\u0000\u0085\u0088\u0001\u0000\u0000\u0000\u0086\u0084"+
		"\u0001\u0000\u0000\u0000\u0086\u0087\u0001\u0000\u0000\u0000\u0087\u0089"+
		"\u0001\u0000\u0000\u0000\u0088\u0086\u0001\u0000\u0000\u0000\u0089\u008a"+
		"\u0005\u0013\u0000\u0000\u008a\u0017\u0001\u0000\u0000\u0000\u008b\u009b"+
		"\u0005\u0014\u0000\u0000\u008c\u009b\u0005\u0015\u0000\u0000\u008d\u009b"+
		"\u0005\u0016\u0000\u0000\u008e\u009b\u0005\u0017\u0000\u0000\u008f\u009b"+
		"\u0005\u0018\u0000\u0000\u0090\u009b\u0005\t\u0000\u0000\u0091\u0092\u0005"+
		"\u0019\u0000\u0000\u0092\u0093\u0003\u0018\f\u0000\u0093\u0094\u0005\u001a"+
		"\u0000\u0000\u0094\u009b\u0001\u0000\u0000\u0000\u0095\u0096\u0005\u001b"+
		"\u0000\u0000\u0096\u0097\u0005\u001c\u0000\u0000\u0097\u0098\u0003\u0018"+
		"\f\u0000\u0098\u0099\u0005\u001d\u0000\u0000\u0099\u009b\u0001\u0000\u0000"+
		"\u0000\u009a\u008b\u0001\u0000\u0000\u0000\u009a\u008c\u0001\u0000\u0000"+
		"\u0000\u009a\u008d\u0001\u0000\u0000\u0000\u009a\u008e\u0001\u0000\u0000"+
		"\u0000\u009a\u008f\u0001\u0000\u0000\u0000\u009a\u0090\u0001\u0000\u0000"+
		"\u0000\u009a\u0091\u0001\u0000\u0000\u0000\u009a\u0095\u0001\u0000\u0000"+
		"\u0000\u009b\u0019\u0001\u0000\u0000\u0000\u009c\u009d\u0006\r\uffff\uffff"+
		"\u0000\u009d\u00a1\u0003\u001c\u000e\u0000\u009e\u009f\u0007\u0000\u0000"+
		"\u0000\u009f\u00a1\u0003\u001a\r\t\u00a0\u009c\u0001\u0000\u0000\u0000"+
		"\u00a0\u009e\u0001\u0000\u0000\u0000\u00a1\u00d5\u0001\u0000\u0000\u0000"+
		"\u00a2\u00a3\n\b\u0000\u0000\u00a3\u00a4\u0007\u0001\u0000\u0000\u00a4"+
		"\u00d4\u0003\u001a\r\t\u00a5\u00a6\n\u0007\u0000\u0000\u00a6\u00a7\u0007"+
		"\u0002\u0000\u0000\u00a7\u00d4\u0003\u001a\r\b\u00a8\u00a9\n\u0006\u0000"+
		"\u0000\u00a9\u00aa\u0007\u0003\u0000\u0000\u00aa\u00d4\u0003\u001a\r\u0007"+
		"\u00ab\u00ac\n\u0005\u0000\u0000\u00ac\u00ad\u0007\u0004\u0000\u0000\u00ad"+
		"\u00d4\u0003\u001a\r\u0006\u00ae\u00af\n\u0004\u0000\u0000\u00af\u00b0"+
		"\u0007\u0005\u0000\u0000\u00b0\u00d4\u0003\u001a\r\u0005\u00b1\u00b2\n"+
		"\u0003\u0000\u0000\u00b2\u00b3\u0005.\u0000\u0000\u00b3\u00d4\u0003\u001a"+
		"\r\u0004\u00b4\u00b5\n\u0002\u0000\u0000\u00b5\u00b6\u0005/\u0000\u0000"+
		"\u00b6\u00d4\u0003\u001a\r\u0003\u00b7\u00b8\n\u0001\u0000\u0000\u00b8"+
		"\u00b9\u0005\u0005\u0000\u0000\u00b9\u00d4\u0003\u001a\r\u0002\u00ba\u00bb"+
		"\n\f\u0000\u0000\u00bb\u00bc\u0005\u001e\u0000\u0000\u00bc\u00c3\u0005"+
		"6\u0000\u0000\u00bd\u00bf\u0005\u0007\u0000\u0000\u00be\u00c0\u0003$\u0012"+
		"\u0000\u00bf\u00be\u0001\u0000\u0000\u0000\u00bf\u00c0\u0001\u0000\u0000"+
		"\u0000\u00c0\u00c1\u0001\u0000\u0000\u0000\u00c1\u00c4\u0005\b\u0000\u0000"+
		"\u00c2\u00c4\u0005\t\u0000\u0000\u00c3\u00bd\u0001\u0000\u0000\u0000\u00c3"+
		"\u00c2\u0001\u0000\u0000\u0000\u00c3\u00c4\u0001\u0000\u0000\u0000\u00c4"+
		"\u00d4\u0001\u0000\u0000\u0000\u00c5\u00c6\n\u000b\u0000\u0000\u00c6\u00c7"+
		"\u0005\u0019\u0000\u0000\u00c7\u00c8\u0003\u001a\r\u0000\u00c8\u00c9\u0005"+
		"\u001a\u0000\u0000\u00c9\u00d4\u0001\u0000\u0000\u0000\u00ca\u00d1\n\n"+
		"\u0000\u0000\u00cb\u00cd\u0005\u0007\u0000\u0000\u00cc\u00ce\u0003$\u0012"+
		"\u0000\u00cd\u00cc\u0001\u0000\u0000\u0000\u00cd\u00ce\u0001\u0000\u0000"+
		"\u0000\u00ce\u00cf\u0001\u0000\u0000\u0000\u00cf\u00d2\u0005\b\u0000\u0000"+
		"\u00d0\u00d2\u0005\t\u0000\u0000\u00d1\u00cb\u0001\u0000\u0000\u0000\u00d1"+
		"\u00d0\u0001\u0000\u0000\u0000\u00d2\u00d4\u0001\u0000\u0000\u0000\u00d3"+
		"\u00a2\u0001\u0000\u0000\u0000\u00d3\u00a5\u0001\u0000\u0000\u0000\u00d3"+
		"\u00a8\u0001\u0000\u0000\u0000\u00d3\u00ab\u0001\u0000\u0000\u0000\u00d3"+
		"\u00ae\u0001\u0000\u0000\u0000\u00d3\u00b1\u0001\u0000\u0000\u0000\u00d3"+
		"\u00b4\u0001\u0000\u0000\u0000\u00d3\u00b7\u0001\u0000\u0000\u0000\u00d3"+
		"\u00ba\u0001\u0000\u0000\u0000\u00d3\u00c5\u0001\u0000\u0000\u0000\u00d3"+
		"\u00ca\u0001\u0000\u0000\u0000\u00d4\u00d7\u0001\u0000\u0000\u0000\u00d5"+
		"\u00d3\u0001\u0000\u0000\u0000\u00d5\u00d6\u0001\u0000\u0000\u0000\u00d6"+
		"\u001b\u0001\u0000\u0000\u0000\u00d7\u00d5\u0001\u0000\u0000\u0000\u00d8"+
		"\u00e1\u0003 \u0010\u0000\u00d9\u00e1\u00056\u0000\u0000\u00da\u00e1\u0003"+
		"&\u0013\u0000\u00db\u00dc\u0005\u0007\u0000\u0000\u00dc\u00dd\u0003\u001a"+
		"\r\u0000\u00dd\u00de\u0005\b\u0000\u0000\u00de\u00e1\u0001\u0000\u0000"+
		"\u0000\u00df\u00e1\u0003\u001e\u000f\u0000\u00e0\u00d8\u0001\u0000\u0000"+
		"\u0000\u00e0\u00d9\u0001\u0000\u0000\u0000\u00e0\u00da\u0001\u0000\u0000"+
		"\u0000\u00e0\u00db\u0001\u0000\u0000\u0000\u00e0\u00df\u0001\u0000\u0000"+
		"\u0000\u00e1\u001d\u0001\u0000\u0000\u0000\u00e2\u00e4\u0005\u0019\u0000"+
		"\u0000\u00e3\u00e5\u0003$\u0012\u0000\u00e4\u00e3\u0001\u0000\u0000\u0000"+
		"\u00e4\u00e5\u0001\u0000\u0000\u0000\u00e5\u00e6\u0001\u0000\u0000\u0000"+
		"\u00e6\u00ee\u0005\u001a\u0000\u0000\u00e7\u00e8\u00050\u0000\u0000\u00e8"+
		"\u00ea\u0005\u0019\u0000\u0000\u00e9\u00eb\u0003$\u0012\u0000\u00ea\u00e9"+
		"\u0001\u0000\u0000\u0000\u00ea\u00eb\u0001\u0000\u0000\u0000\u00eb\u00ec"+
		"\u0001\u0000\u0000\u0000\u00ec\u00ee\u0005\u001a\u0000\u0000\u00ed\u00e2"+
		"\u0001\u0000\u0000\u0000\u00ed\u00e7\u0001\u0000\u0000\u0000\u00ee\u001f"+
		"\u0001\u0000\u0000\u0000\u00ef\u00f0\u00055\u0000\u0000\u00f0\u00fd\u0005"+
		"\u001f\u0000\u0000\u00f1\u00f2\u0005\u0007\u0000\u0000\u00f2\u00f3\u0003"+
		"\"\u0011\u0000\u00f3\u00f4\u0005\b\u0000\u0000\u00f4\u00fe\u0001\u0000"+
		"\u0000\u0000\u00f5\u00f6\u0005\u0019\u0000\u0000\u00f6\u00f7\u0003\"\u0011"+
		"\u0000\u00f7\u00f8\u0005\u001a\u0000\u0000\u00f8\u00fe\u0001\u0000\u0000"+
		"\u0000\u00f9\u00fa\u0005\u0012\u0000\u0000\u00fa\u00fb\u0003\"\u0011\u0000"+
		"\u00fb\u00fc\u0005\u0013\u0000\u0000\u00fc\u00fe\u0001\u0000\u0000\u0000"+
		"\u00fd\u00f1\u0001\u0000\u0000\u0000\u00fd\u00f5\u0001\u0000\u0000\u0000"+
		"\u00fd\u00f9\u0001\u0000\u0000\u0000\u00fe!\u0001\u0000\u0000\u0000\u00ff"+
		"\u0102\u0003\u001a\r\u0000\u0100\u0102\u00054\u0000\u0000\u0101\u00ff"+
		"\u0001\u0000\u0000\u0000\u0101\u0100\u0001\u0000\u0000\u0000\u0102\u010a"+
		"\u0001\u0000\u0000\u0000\u0103\u0106\u0005\u000b\u0000\u0000\u0104\u0107"+
		"\u0003\u001a\r\u0000\u0105\u0107\u00054\u0000\u0000\u0106\u0104\u0001"+
		"\u0000\u0000\u0000\u0106\u0105\u0001\u0000\u0000\u0000\u0107\u0109\u0001"+
		"\u0000\u0000\u0000\u0108\u0103\u0001\u0000\u0000\u0000\u0109\u010c\u0001"+
		"\u0000\u0000\u0000\u010a\u0108\u0001\u0000\u0000\u0000\u010a\u010b\u0001"+
		"\u0000\u0000\u0000\u010b\u010e\u0001\u0000\u0000\u0000\u010c\u010a\u0001"+
		"\u0000\u0000\u0000\u010d\u010f\u0005\u000b\u0000\u0000\u010e\u010d\u0001"+
		"\u0000\u0000\u0000\u010e\u010f\u0001\u0000\u0000\u0000\u010f#\u0001\u0000"+
		"\u0000\u0000\u0110\u0115\u0003\u001a\r\u0000\u0111\u0112\u0005\u000b\u0000"+
		"\u0000\u0112\u0114\u0003\u001a\r\u0000\u0113\u0111\u0001\u0000\u0000\u0000"+
		"\u0114\u0117\u0001\u0000\u0000\u0000\u0115\u0113\u0001\u0000\u0000\u0000"+
		"\u0115\u0116\u0001\u0000\u0000\u0000\u0116\u0119\u0001\u0000\u0000\u0000"+
		"\u0117\u0115\u0001\u0000\u0000\u0000\u0118\u011a\u0005\u000b\u0000\u0000"+
		"\u0119\u0118\u0001\u0000\u0000\u0000\u0119\u011a\u0001\u0000\u0000\u0000"+
		"\u011a%\u0001\u0000\u0000\u0000\u011b\u011c\u0007\u0006\u0000\u0000\u011c"+
		"\'\u0001\u0000\u0000\u0000 +;?DHPTXajtv\u0086\u009a\u00a0\u00bf\u00c3"+
		"\u00cd\u00d1\u00d3\u00d5\u00e0\u00e4\u00ea\u00ed\u00fd\u0101\u0106\u010a"+
		"\u010e\u0115\u0119";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}