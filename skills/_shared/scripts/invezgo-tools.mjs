export const groupDescriptions = {
  "invezgo-data":
    "Public BEI and IDX market data plus broker accumulation, inventory, momentum, sankey, and stalking tools.",
  screener: "Formula screening plus insider and major-holder ownership reports.",
  personal: "Authenticated watchlist, portfolio, journal, and trade data.",
};

const stockCode = {
  type: "string",
  default: "BBCA",
  description: "IDX stock code, for example BBCA or TLKM.",
};

const brokerCode = {
  type: "string",
  description: "Two-letter broker code, for example YP or XL.",
};

const brokerCodeWithDefault = {
  ...brokerCode,
  default: "XL",
};

const indexCode = {
  type: "string",
  default: "COMPOSITE",
  description: "IDX index code, for example COMPOSITE, LQ45, or IDX30.",
};

const fromDate = {
  type: "string",
  required: true,
  description: "Start date in YYYY-MM-DD format.",
};

const toDate = {
  type: "string",
  required: true,
  description: "End date in YYYY-MM-DD format.",
};

const singleDate = {
  type: "string",
  required: true,
  description: "Date in YYYY-MM-DD format.",
};

const marketType = {
  type: "string",
  default: "RG",
  allowed: ["RG", "NG", "TN"],
  description: "Market type: Regular, Negotiated, or Cash.",
};

const marketTypeAll = {
  type: "string",
  default: "RG",
  allowed: ["ALL", "RG", "NG", "TN"],
  description: "Market type: all, Regular, Negotiated, or Cash.",
};

const investorType = {
  type: "string",
  default: "all",
  allowed: ["all", "f", "d"],
  description: "Investor type: all, foreign, or domestic.",
};

const buyerSellerType = {
  type: "string",
  default: "ALL",
  allowed: ["ALL", "F", "D"],
  description: "Investor side: all, foreign, or domestic.",
};

const statementType = {
  type: "string",
  default: "BS",
  allowed: ["BS", "IS", "CF"],
  description: "Financial statement: balance sheet, income statement, or cash flow.",
};

const reportType = {
  type: "string",
  default: "Q",
  allowed: ["Q", "FY", "Q1", "Q2", "Q3", "Q4"],
  description: "Financial reporting period.",
};

const stockOrBrokerFilter = {
  type: "string[]",
  description: "Comma-separated codes to filter on.",
};

const pagerFrom = {
  from: singleDate,
  page: {
    type: "integer",
    default: 1,
    description: "Page number.",
  },
  limit: {
    type: "integer",
    default: 10,
    description: "Rows per page.",
  },
};

export const toolDefinitions = {
  watchlist: {
    groups: ["personal"],
    description: "List all watchlists for the authenticated user.",
    method: "GET",
    path: () => "watchlists",
    query: [{ key: "group", value: "null" }],
    args: {},
  },
  journal: {
    groups: ["personal"],
    description: "List journal entries for a date range.",
    method: "GET",
    path: () => "journals",
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
    ],
    args: {
      from: { ...fromDate, default: "2025-07-01" },
      to: { ...toDate, default: "2025-08-05" },
    },
  },
  "journal-summary": {
    groups: ["personal"],
    description: "Summarize journal entries for a date range.",
    method: "GET",
    path: () => "journals/summary",
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
    ],
    args: {
      from: { ...fromDate, default: "2025-07-01" },
      to: { ...toDate, default: "2025-08-05" },
    },
  },
  portfolio: {
    groups: ["personal"],
    description: "Fetch the authenticated user's portfolio.",
    method: "GET",
    path: () => "portfolios",
    args: {},
  },
  "portfolio-summary": {
    groups: ["personal"],
    description: "Fetch the authenticated user's portfolio summary.",
    method: "GET",
    path: () => "portfolios/summary",
    args: {},
  },
  trade: {
    groups: ["personal"],
    description: "List trades for a date range.",
    method: "GET",
    path: () => "trades",
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
    ],
    args: {
      from: { ...fromDate, default: "2025-07-01" },
      to: { ...toDate, default: "2025-08-05" },
    },
  },
  "trade-summary": {
    groups: ["personal"],
    description: "Summarize trades for a date range.",
    method: "GET",
    path: () => "trades/summary",
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
    ],
    args: {
      from: { ...fromDate, default: "2025-07-01" },
      to: { ...toDate, default: "2025-08-05" },
    },
  },
  "watchlist-detail": {
    groups: ["personal"],
    description: "Fetch one watchlist by id.",
    method: "GET",
    path: ({ id }) => `watchlists/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Watchlist id.",
      },
    },
  },
  "trade-summary-chart": {
    groups: ["personal"],
    description: "Fetch the trade performance chart for a date range.",
    method: "GET",
    path: () => "trades/summary-chart",
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
    ],
    args: {
      from: fromDate,
      to: toDate,
    },
  },
  "watchlist-group-list": {
    groups: ["personal"],
    description: "List watchlist groups for the authenticated user.",
    method: "GET",
    path: () => "watchlists/group",
    args: {},
  },
  "watchlist-group-create": {
    groups: ["personal"],
    description: "Create a watchlist group.",
    method: "POST",
    path: () => "watchlists/group",
    args: {
      name: {
        type: "string",
        required: true,
        description: "Watchlist group name.",
      },
    },
    body: ({ name }) => ({ name }),
  },
  "watchlist-group-update": {
    groups: ["personal"],
    description: "Update a watchlist group by id.",
    method: "PUT",
    path: ({ id }) => `watchlists/group/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Watchlist group id.",
      },
      name: {
        type: "string",
        required: true,
        description: "Watchlist group name.",
      },
    },
    body: ({ name }) => ({ name }),
  },
  "watchlist-group-delete": {
    groups: ["personal"],
    description: "Delete a watchlist group by id.",
    method: "DELETE",
    path: ({ id }) => `watchlists/group/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Watchlist group id.",
      },
    },
  },
  "journal-file-extract": {
    groups: ["personal"],
    description: "Extract journal information from uploaded file metadata endpoint.",
    method: "POST",
    path: () => "journals/file",
    args: {},
  },
  "journal-update-note": {
    groups: ["personal"],
    description: "Update note on one journal entry by id.",
    method: "PATCH",
    path: ({ id }) => `journals/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Journal id.",
      },
      note: {
        type: "string",
        description: "Journal note.",
      },
    },
    body: ({ note }) => ({ note }),
  },
  "trade-update-note": {
    groups: ["personal"],
    description: "Update note on one trade by id.",
    method: "PATCH",
    path: ({ id }) => `trades/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Trade id.",
      },
      note: {
        type: "string",
        description: "Trade note.",
      },
    },
    body: ({ note }) => ({ note }),
  },
  "alert-list": {
    groups: ["personal"],
    description: "List all personal alerts.",
    method: "GET",
    path: () => "alerts",
    args: {},
  },
  "alert-create": {
    groups: ["personal"],
    description: "Create a new alert.",
    method: "POST",
    path: () => "alerts",
    args: {
      name: {
        type: "string",
        required: true,
        description: "Alert name.",
      },
      description: {
        type: "string",
        description: "Optional alert description.",
      },
      category: {
        type: "string[]",
        required: true,
        description: "Comma-separated categories.",
      },
      every: {
        type: "string",
        required: true,
        allowed: [
          "FOURTY_FIVE_SECONDS",
          "FIVE_MINUTES",
          "TEN_MINUTES",
          "THIRTY_MINUTES",
          "ONE_HOUR",
          "END_SESSION",
          "END_OF_DAY",
        ],
        description: "Alert schedule.",
      },
      send: {
        type: "string",
        required: true,
        allowed: ["IN_OUT", "IN", "OUT"],
        description: "Signal direction.",
      },
      scope: {
        type: "string[]",
        description: "Optional comma-separated scope values.",
      },
      formula: {
        type: "string",
        required: true,
        description: "Alert formula.",
      },
    },
    body: ({ name, description, category, every, send, scope, formula }) => ({
      name,
      description,
      category,
      every,
      send,
      scope,
      formula,
    }),
  },
  "alert-test": {
    groups: ["personal"],
    description: "Test an alert formula and category.",
    method: "POST",
    path: () => "alerts/test",
    args: {
      formula: {
        type: "string",
        required: true,
        description: "Alert formula.",
      },
      category: {
        type: "string[]",
        required: true,
        description: "Comma-separated categories.",
      },
    },
    body: ({ formula, category }) => ({ formula, category }),
  },
  "alert-update": {
    groups: ["personal"],
    description: "Update one alert by id.",
    method: "PUT",
    path: ({ id }) => `alerts/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Alert id.",
      },
      name: {
        type: "string",
        required: true,
        description: "Alert name.",
      },
      description: {
        type: "string",
        description: "Optional alert description.",
      },
      category: {
        type: "string[]",
        required: true,
        description: "Comma-separated categories.",
      },
      every: {
        type: "string",
        required: true,
        allowed: [
          "FOURTY_FIVE_SECONDS",
          "FIVE_MINUTES",
          "TEN_MINUTES",
          "THIRTY_MINUTES",
          "ONE_HOUR",
          "END_SESSION",
          "END_OF_DAY",
        ],
        description: "Alert schedule.",
      },
      send: {
        type: "string",
        required: true,
        allowed: ["IN_OUT", "IN", "OUT"],
        description: "Signal direction.",
      },
      scope: {
        type: "string[]",
        description: "Optional comma-separated scope values.",
      },
      formula: {
        type: "string",
        required: true,
        description: "Alert formula.",
      },
    },
    body: ({ name, description, category, every, send, scope, formula }) => ({
      name,
      description,
      category,
      every,
      send,
      scope,
      formula,
    }),
  },
  "alert-delete": {
    groups: ["personal"],
    description: "Delete one alert by id.",
    method: "DELETE",
    path: ({ id }) => `alerts/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Alert id.",
      },
    },
  },
  search: {
    groups: ["invezgo-data"],
    description: "General search endpoint for stocks, users, and content.",
    method: "GET",
    path: () => "search",
    query: [{ key: "query", arg: "query" }],
    args: {
      query: {
        type: "string",
        required: true,
        description: "Search keyword.",
      },
    },
  },
  "search-user": {
    groups: ["invezgo-data"],
    description: "Search users by keyword.",
    method: "GET",
    path: () => "search/user",
    query: [
      { key: "query", arg: "query" },
      { key: "cursor", arg: "cursor" },
    ],
    args: {
      query: {
        type: "string",
        required: true,
        description: "Search keyword.",
      },
      cursor: {
        type: "string",
        default: "1",
        description: "Pagination cursor.",
      },
    },
  },
  "profile-detail": {
    groups: ["invezgo-data"],
    description: "Public profile details by username.",
    method: "GET",
    path: ({ username }) => `profile/detail/${encodeURIComponent(username)}`,
    args: {
      username: {
        type: "string",
        required: true,
        description: "Username.",
      },
    },
  },
  "profile-posts": {
    groups: ["invezgo-data"],
    description: "Public posts by username.",
    method: "GET",
    path: ({ username }) => `profile/posts/${encodeURIComponent(username)}`,
    query: [
      { key: "page", arg: "page" },
      { key: "limit", arg: "limit" },
    ],
    args: {
      username: {
        type: "string",
        required: true,
        description: "Username.",
      },
      page: {
        type: "string",
        default: "1",
        description: "Page number.",
      },
      limit: {
        type: "string",
        default: "10",
        description: "Rows per page.",
      },
    },
  },
  "profile-posts-category": {
    groups: ["invezgo-data"],
    description: "Public posts by username and category.",
    method: "GET",
    path: ({ username, category }) =>
      `profile/posts/${encodeURIComponent(username)}/${encodeURIComponent(category)}`,
    query: [
      { key: "page", arg: "page" },
      { key: "limit", arg: "limit" },
    ],
    args: {
      username: {
        type: "string",
        required: true,
        description: "Username.",
      },
      category: {
        type: "string",
        required: true,
        description: "Post category.",
      },
      page: {
        type: "string",
        default: "1",
        description: "Page number.",
      },
      limit: {
        type: "string",
        default: "10",
        description: "Rows per page.",
      },
    },
  },
  "profile-watchlist": {
    groups: ["invezgo-data"],
    description: "Public watchlist by username.",
    method: "GET",
    path: ({ username }) => `profile/watchlist/${encodeURIComponent(username)}`,
    args: {
      username: {
        type: "string",
        required: true,
        description: "Username.",
      },
    },
  },
  "profile-follow": {
    groups: ["invezgo-data"],
    description: "Public followers data by username.",
    method: "GET",
    path: ({ username }) => `profile/follow/${encodeURIComponent(username)}`,
    args: {
      username: {
        type: "string",
        required: true,
        description: "Username.",
      },
    },
  },
  "profile-following": {
    groups: ["invezgo-data"],
    description: "Public following data by username.",
    method: "GET",
    path: ({ username }) => `profile/following/${encodeURIComponent(username)}`,
    args: {
      username: {
        type: "string",
        required: true,
        description: "Username.",
      },
    },
  },
  "profile-membership": {
    groups: ["invezgo-data"],
    description: "Public membership data by username.",
    method: "GET",
    path: ({ username }) => `profile/membership/${encodeURIComponent(username)}`,
    args: {
      username: {
        type: "string",
        required: true,
        description: "Username.",
      },
    },
  },
  "posts-list": {
    groups: ["invezgo-data"],
    description: "List public posts feed.",
    method: "GET",
    path: () => "posts",
    args: {},
  },
  "posts-category": {
    groups: ["invezgo-data"],
    description: "List public posts by category.",
    method: "GET",
    path: ({ category }) => `posts/category/${encodeURIComponent(category)}`,
    args: {
      category: {
        type: "string",
        required: true,
        description: "Post category.",
      },
    },
  },
  "posts-space": {
    groups: ["invezgo-data"],
    description: "List stock-space posts by code.",
    method: "GET",
    path: ({ code }) => `posts/space/${encodeURIComponent(code)}`,
    args: { code: stockCode },
  },
  "posts-space-category": {
    groups: ["invezgo-data"],
    description: "List stock-space posts by code and category.",
    method: "GET",
    path: ({ code, category }) =>
      `posts/space/category/${encodeURIComponent(code)}/${encodeURIComponent(category)}`,
    args: {
      code: stockCode,
      category: {
        type: "string",
        required: true,
        description: "Post category.",
      },
    },
  },
  "posts-detail": {
    groups: ["invezgo-data"],
    description: "Get one post detail by id.",
    method: "GET",
    path: ({ id }) => `posts/detail/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Post id.",
      },
    },
  },
  "posts-comment": {
    groups: ["invezgo-data"],
    description: "Get post comments by post id.",
    method: "GET",
    path: ({ id }) => `posts/comment/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Post id.",
      },
    },
  },
  "posts-like": {
    groups: ["invezgo-data"],
    description: "Get post likes feed.",
    method: "GET",
    path: () => "posts/like",
    args: {},
  },
  "posts-favorite": {
    groups: ["invezgo-data"],
    description: "Get post favorites feed.",
    method: "GET",
    path: () => "posts/favorite",
    args: {},
  },
  "posts-vote": {
    groups: ["invezgo-data"],
    description: "Get voters for one post vote id.",
    method: "GET",
    path: ({ id }) => `posts/vote/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Vote id.",
      },
    },
  },
  information: {
    groups: ["invezgo-data"],
    description: "Fetch company information for one stock code.",
    method: "GET",
    path: ({ code }) => `analysis/information/${encodeURIComponent(code)}`,
    args: { code: stockCode },
  },
  "list-stock": {
    groups: ["invezgo-data", "screener"],
    description: "List all live IDX stocks.",
    method: "GET",
    path: () => "analysis/list/stock",
    args: {},
  },
  "list-broker": {
    groups: ["invezgo-data", "screener"],
    description: "List all broker codes.",
    method: "GET",
    path: () => "analysis/list/broker",
    args: {},
  },
  "top-change": {
    groups: ["invezgo-data"],
    description: "Top price changes for one trading day.",
    method: "GET",
    path: () => "analysis/top/change",
    query: [{ key: "date", arg: "date" }],
    args: { date: singleDate },
  },
  "top-foreign": {
    groups: ["invezgo-data"],
    description: "Top foreign accumulation and distribution for one day.",
    method: "GET",
    path: () => "analysis/top/foreign",
    query: [{ key: "date", arg: "date" }],
    args: { date: singleDate },
  },
  "top-accumulation": {
    groups: ["invezgo-data"],
    description: "Top accumulation and distribution for one day.",
    method: "GET",
    path: () => "analysis/top/accumulation",
    query: [{ key: "date", arg: "date" }],
    args: { date: singleDate },
  },
  "top-ritel": {
    groups: ["invezgo-data"],
    description: "Top retail accumulation and distribution for one day.",
    method: "GET",
    path: () => "analysis/top/ritel",
    query: [
      { key: "date", arg: "date" },
      { key: "filter_column", arg: "filter_column" },
      { key: "filter_operator", arg: "filter_operator" },
      { key: "filter_value", arg: "filter_value" },
    ],
    args: {
      date: singleDate,
      filter_column: {
        type: "string",
        allowed: ["change", "value", "volume", "ratio"],
        description: "Optional filter column.",
      },
      filter_operator: {
        type: "string",
        allowed: ["<", ">", "=", ">=", "<=", "!="],
        description: "Optional comparison operator.",
      },
      filter_value: {
        type: "number",
        description: "Optional filter value.",
      },
    },
  },
  chart: {
    groups: ["invezgo-data"],
    description: "Historical stock chart for a date range.",
    method: "GET",
    path: ({ code }) => `analysis/chart/stock/${encodeURIComponent(code)}`,
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
    ],
    args: {
      code: stockCode,
      from: fromDate,
      to: toDate,
    },
  },
  "chart-indicator": {
    groups: ["invezgo-data"],
    description: "Historical stock chart for one technical indicator.",
    method: "GET",
    path: ({ indicator, code }) =>
      `analysis/chart/stock/${encodeURIComponent(indicator)}/${encodeURIComponent(code)}`,
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
    ],
    args: {
      code: stockCode,
      from: fromDate,
      to: toDate,
      indicator: {
        type: "string",
        default: "bdm",
        allowed: ["bdm", "ritel", "ratio", "value", "volume", "foreign", "accumulation", "freq"],
        description: "Indicator type.",
      },
    },
  },
  "shareholder-number": {
    groups: ["invezgo-data"],
    description: "Shareholder count data for one stock code.",
    method: "GET",
    path: ({ code }) => `analysis/shareholder/number/${encodeURIComponent(code)}`,
    args: { code: stockCode },
  },
  shareholder: {
    groups: ["invezgo-data"],
    description: "Latest shareholder composition for one stock code.",
    method: "GET",
    path: ({ code }) => `analysis/shareholder/${encodeURIComponent(code)}`,
    args: { code: stockCode },
  },
  "shareholder-high": {
    groups: ["invezgo-data", "screener"],
    description: "High concentration stock ownership for all issuers.",
    method: "GET",
    path: () => "analysis/shareholder/high",
    args: {},
  },
  "shareholder-detail": {
    groups: ["invezgo-data"],
    description: "Detailed five-percent shareholder ownership by stock code or holder name.",
    method: "GET",
    path: () => "analysis/shareholder-detail",
    query: [
      { key: "code", arg: "code" },
      { key: "name", arg: "name" },
    ],
    args: {
      code: {
        type: "string",
        description: "Optional stock code filter.",
      },
      name: {
        type: "string",
        description: "Optional shareholder name filter.",
      },
    },
    validate: ({ code, name }) => {
      if (!code && !name) {
        throw new Error('Missing required argument: provide at least one of "code" or "name".');
      }
    },
  },
  "shareholder-one-detail": {
    groups: ["invezgo-data"],
    description: "Detailed one-percent shareholder ownership by stock code or holder name.",
    method: "GET",
    path: () => "analysis/shareholder-detail-one",
    query: [
      { key: "code", arg: "code" },
      { key: "name", arg: "name" },
    ],
    args: {
      code: {
        type: "string",
        description: "Optional stock code filter.",
      },
      name: {
        type: "string",
        description: "Optional shareholder name filter.",
      },
    },
    validate: ({ code, name }) => {
      if (!code && !name) {
        throw new Error('Missing required argument: provide at least one of "code" or "name".');
      }
    },
  },
  "shareholder-ksei": {
    groups: ["invezgo-data"],
    description: "KSEI ownership composition for one stock code over N months.",
    method: "GET",
    path: ({ code }) => `analysis/shareholder/ksei/${encodeURIComponent(code)}`,
    query: [{ key: "range", arg: "range" }],
    args: {
      code: stockCode,
      range: {
        type: "integer",
        required: true,
        description: "Month range.",
      },
    },
  },
  "shareholder-relation": {
    groups: ["invezgo-data"],
    description: "Shareholder network relation data by optional code or name.",
    method: "GET",
    path: () => "analysis/shareholder/relation",
    query: [
      { key: "code", arg: "code" },
      { key: "name", arg: "name" },
      { key: "depth", arg: "depth" },
      { key: "max_nodes", arg: "max_nodes" },
      { key: "neighbors", arg: "neighbors" },
      { key: "min_percentage", arg: "min_percentage" },
    ],
    args: {
      code: {
        type: "string",
        description: "Optional stock code filter.",
      },
      name: {
        type: "string",
        description: "Optional shareholder name filter.",
      },
      depth: {
        type: "integer",
        description: "Optional graph depth.",
      },
      max_nodes: {
        type: "integer",
        description: "Optional maximum node count.",
      },
      neighbors: {
        type: "integer",
        description: "Optional max neighbors per node.",
      },
      min_percentage: {
        type: "number",
        description: "Optional minimum ownership percentage.",
      },
    },
  },
  "shareholder-classification": {
    groups: ["invezgo-data"],
    description: "Shareholder classification trend for one stock code.",
    method: "GET",
    path: ({ code }) => `analysis/shareholder/classification/${encodeURIComponent(code)}`,
    query: [{ key: "range", arg: "range" }],
    args: {
      code: stockCode,
      range: {
        type: "integer",
        default: 6,
        description: "Month range.",
      },
    },
  },
  "shareholder-classify-table": {
    groups: ["invezgo-data"],
    description: "Latest shareholder classification table for one stock code.",
    method: "GET",
    path: ({ code }) => `analysis/shareholder/classify-table/${encodeURIComponent(code)}`,
    args: { code: stockCode },
  },
  "summary-stock": {
    groups: ["invezgo-data"],
    description: "Broker summary for a stock and date range.",
    method: "GET",
    path: ({ code }) => `analysis/summary/stock/${encodeURIComponent(code)}`,
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "investor", arg: "investor" },
      { key: "market", arg: "market" },
    ],
    args: {
      code: stockCode,
      from: fromDate,
      to: toDate,
      investor: investorType,
      market: marketType,
    },
  },
  "summary-broker": {
    groups: ["invezgo-data"],
    description: "Broker summary for one broker code and date range.",
    method: "GET",
    path: ({ code }) => `analysis/summary/broker/${encodeURIComponent(code)}`,
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "investor", arg: "investor" },
      { key: "market", arg: "market" },
    ],
    args: {
      code: brokerCodeWithDefault,
      from: fromDate,
      to: toDate,
      investor: investorType,
      market: marketType,
    },
  },
  "inventory-stock": {
    groups: ["invezgo-data"],
    description: "Broker inventory chart for one stock code and date range.",
    method: "GET",
    path: ({ code }) => `analysis/inventory-chart/stock/${encodeURIComponent(code)}`,
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "investor", arg: "investor" },
      { key: "market", arg: "market" },
      { key: "scope", arg: "scope" },
      { key: "limit", arg: "limit" },
      { key: "filter", arg: "filter" },
    ],
    args: {
      code: stockCode,
      from: fromDate,
      to: toDate,
      investor: investorType,
      market: marketType,
      scope: {
        type: "string",
        default: "vol",
        allowed: ["vol", "val", "freq"],
        description: "Aggregation scope.",
      },
      limit: {
        type: "integer",
        default: 5,
        description: "Number of brokers to return.",
      },
      filter: stockOrBrokerFilter,
    },
  },
  "inventory-broker": {
    groups: ["invezgo-data"],
    description: "Stock inventory chart for one broker code and date range.",
    method: "GET",
    path: ({ code }) => `analysis/inventory-chart/broker/${encodeURIComponent(code)}`,
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "investor", arg: "investor" },
      { key: "market", arg: "market" },
      { key: "scope", arg: "scope" },
      { key: "limit", arg: "limit" },
      { key: "filter", arg: "filter" },
    ],
    args: {
      code: brokerCodeWithDefault,
      from: fromDate,
      to: toDate,
      investor: investorType,
      market: marketType,
      scope: {
        type: "string",
        default: "vol",
        allowed: ["vol", "val", "freq"],
        description: "Aggregation scope.",
      },
      limit: {
        type: "integer",
        default: 5,
        description: "Number of stocks to return.",
      },
      filter: stockOrBrokerFilter,
    },
  },
  momentum: {
    groups: ["invezgo-data"],
    description: "Intraday buy and sell momentum for one stock and date.",
    method: "GET",
    path: ({ code }) => `analysis/momentum-chart/${encodeURIComponent(code)}`,
    query: [
      { key: "date", arg: "date" },
      { key: "range", arg: "range" },
      { key: "scope", arg: "scope" },
    ],
    args: {
      code: stockCode,
      date: singleDate,
      range: {
        type: "integer",
        default: 5,
        description: "Minutes per bucket.",
      },
      scope: {
        type: "string",
        default: "volume",
        allowed: ["value", "volume"],
        description: "Aggregation scope.",
      },
    },
  },
  "intraday-inventory": {
    groups: ["invezgo-data"],
    description: "Intraday broker inventory for one stock and date.",
    method: "GET",
    path: ({ code }) => `analysis/intraday-inventory-chart/${encodeURIComponent(code)}`,
    query: [
      { key: "date", arg: "date" },
      { key: "range", arg: "range" },
      { key: "type", arg: "type" },
      { key: "total", arg: "total" },
      { key: "buyer", arg: "buyer" },
      { key: "seller", arg: "seller" },
      { key: "market", arg: "market" },
      { key: "broker", arg: "broker" },
    ],
    args: {
      code: stockCode,
      date: singleDate,
      range: {
        type: "integer",
        default: 5,
        description: "Minutes per bucket.",
      },
      type: {
        type: "string",
        default: "value",
        allowed: ["volume", "value"],
        description: "Aggregation metric.",
      },
      total: {
        type: "integer",
        default: 4,
        description: "Number of brokers to return.",
      },
      buyer: buyerSellerType,
      seller: buyerSellerType,
      market: marketTypeAll,
      broker: stockOrBrokerFilter,
    },
  },
  sankey: {
    groups: ["invezgo-data"],
    description: "Broker flow sankey for one stock and date.",
    method: "GET",
    path: ({ code }) => `analysis/sankey-chart/${encodeURIComponent(code)}`,
    query: [
      { key: "date", arg: "date" },
      { key: "type", arg: "type" },
      { key: "buyer", arg: "buyer" },
      { key: "seller", arg: "seller" },
      { key: "market", arg: "market" },
      { key: "broker", arg: "broker" },
    ],
    args: {
      code: stockCode,
      date: singleDate,
      type: {
        type: "string",
        default: "value",
        allowed: ["volume", "value"],
        description: "Aggregation metric.",
      },
      buyer: buyerSellerType,
      seller: buyerSellerType,
      market: marketTypeAll,
      broker: stockOrBrokerFilter,
    },
  },
  insider: {
    groups: ["screener"],
    description: "Insider transaction data filtered by date range and optional name or code.",
    method: "GET",
    path: () => "analysis/shareholder-insider",
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "page", arg: "page" },
      { key: "limit", arg: "limit" },
      { key: "name", arg: "name" },
      { key: "code", arg: "code" },
    ],
    args: {
      ...pagerFrom,
      to: toDate,
      code: {
        type: "string",
        description: "Optional stock code filter.",
      },
      name: {
        type: "string",
        description: "Optional holder name filter.",
      },
    },
    unwrap: "data",
  },
  "above-five-percent": {
    groups: ["screener"],
    description: "Holder positions above five percent filtered by date range and optional code, name, or broker.",
    method: "GET",
    path: () => "analysis/shareholder-above",
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "page", arg: "page" },
      { key: "limit", arg: "limit" },
      { key: "broker", arg: "broker" },
      { key: "name", arg: "name" },
      { key: "code", arg: "code" },
    ],
    args: {
      ...pagerFrom,
      to: toDate,
      code: {
        type: "string",
        description: "Optional stock code filter.",
      },
      name: {
        type: "string",
        description: "Optional holder name filter.",
      },
      broker: {
        type: "string",
        description: "Optional broker code filter.",
      },
    },
    unwrap: "data",
  },
  "above-one-percent": {
    groups: ["screener"],
    description: "Holder positions above one percent filtered by date range and optional code or name.",
    method: "GET",
    path: () => "analysis/shareholder-one",
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "page", arg: "page" },
      { key: "limit", arg: "limit" },
      { key: "name", arg: "name" },
      { key: "code", arg: "code" },
    ],
    args: {
      ...pagerFrom,
      to: toDate,
      code: {
        type: "string",
        description: "Optional stock code filter.",
      },
      name: {
        type: "string",
        description: "Optional holder name filter.",
      },
    },
    unwrap: "data",
  },
  "price-diary": {
    groups: ["invezgo-data"],
    description: "Daily price change table for one stock code.",
    method: "GET",
    path: ({ code }) => `analysis/price-diary/${encodeURIComponent(code)}`,
    args: { code: stockCode },
  },
  "price-seasonal": {
    groups: ["invezgo-data"],
    description: "Monthly seasonality table for one stock code.",
    method: "GET",
    path: ({ code }) => `analysis/price-seasonality/${encodeURIComponent(code)}`,
    query: [{ key: "range", arg: "range" }],
    args: {
      code: stockCode,
      range: {
        type: "integer",
        default: 12,
        description: "Month range.",
      },
    },
  },
  "search-stock": {
    groups: ["invezgo-data", "screener"],
    description: "Search stocks by keyword.",
    method: "GET",
    path: () => "search/stock",
    query: [
      { key: "query", arg: "query" },
      { key: "cursor", arg: "cursor" },
    ],
    args: {
      query: {
        type: "string",
        required: true,
        description: "Search keyword.",
      },
      cursor: {
        type: "string",
        required: true,
        default: "1",
        description: "Pagination cursor.",
      },
    },
  },
  news: {
    groups: ["invezgo-data"],
    description: "Latest stock news for one code.",
    method: "GET",
    path: ({ code }) => `posts/space/category/${encodeURIComponent(code)}/NEWS`,
    query: [
      { key: "page", value: 1 },
      { key: "limit", value: 10 },
    ],
    args: { code: stockCode },
  },
  disclosure: {
    groups: ["invezgo-data"],
    description: "Latest disclosures for one stock code.",
    method: "GET",
    path: ({ code }) => `posts/space/category/${encodeURIComponent(code)}/REPORT`,
    query: [
      { key: "page", value: 1 },
      { key: "limit", value: 10 },
    ],
    args: { code: stockCode },
  },
  financial: {
    groups: ["invezgo-data"],
    description: "Financial statements for one stock code.",
    method: "GET",
    path: ({ code }) => `analysis/financial-statement/${encodeURIComponent(code)}`,
    query: [
      { key: "statement", arg: "statement" },
      { key: "type", arg: "type" },
      { key: "limit", arg: "limit" },
    ],
    args: {
      code: stockCode,
      statement: statementType,
      type: reportType,
      limit: {
        type: "integer",
        default: 15,
        description: "Rows to return.",
      },
    },
  },
  keystat: {
    groups: ["invezgo-data"],
    description: "Key financial ratios and metrics for one stock code.",
    method: "GET",
    path: ({ code }) => `analysis/keystat/${encodeURIComponent(code)}`,
    query: [
      { key: "type", arg: "type" },
      { key: "limit", arg: "limit" },
    ],
    args: {
      code: stockCode,
      type: reportType,
      limit: {
        type: "integer",
        default: 15,
        description: "Rows to return.",
      },
    },
  },
  intraday: {
    groups: ["invezgo-data"],
    description: "Intraday stock chart for one code.",
    method: "GET",
    path: ({ code }) => `analysis/intraday/${encodeURIComponent(code)}`,
    query: [{ key: "market", arg: "market" }],
    args: {
      code: stockCode,
      market: marketType,
    },
  },
  "intraday-data": {
    groups: ["invezgo-data"],
    description: "Compact intraday stock data for one code.",
    method: "GET",
    path: ({ code }) => `analysis/intraday-data/${encodeURIComponent(code)}`,
    query: [{ key: "market", arg: "market" }],
    args: {
      code: stockCode,
      market: marketType,
    },
  },
  "order-book": {
    groups: ["invezgo-data"],
    description: "Order book for one stock code.",
    method: "GET",
    path: ({ code }) => `analysis/order-book/${encodeURIComponent(code)}`,
    query: [{ key: "market", arg: "market" }],
    args: {
      code: stockCode,
      market: marketType,
    },
  },
  calendar: {
    groups: ["invezgo-data"],
    description: "Corporate action calendar filtered by optional code or action type.",
    method: "GET",
    path: () => "analysis/calendar",
    query: [
      { key: "limit", arg: "limit" },
      { key: "page", arg: "page" },
      { key: "code", arg: "code" },
      { key: "type", arg: "type" },
    ],
    args: {
      code: {
        type: "string",
        description: "Optional stock code filter.",
      },
      type: {
        type: "string",
        allowed: [
          "IPO",
          "PUBLIC_EXPOSE",
          "REVERSE",
          "RIGHT",
          "RUPS_RESULT",
          "RUPS_SCHEDULE",
          "SPLIT",
          "WARRANT",
          "BONUS",
          "CONVERTION",
          "DIVIDEND",
        ],
        description: "Optional corporate action type.",
      },
      limit: {
        type: "integer",
        default: 10,
        description: "Rows per page.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number.",
      },
    },
    unwrap: "data",
  },
  screener: {
    groups: ["screener"],
    description: "Run an Invezgo screener formula.",
    method: "POST",
    path: () => "screener/screen",
    args: {
      formula: {
        type: "string",
        required: true,
        description: "Invezgo screener formula.",
      },
    },
    body: ({ formula }) => ({ formula }),
  },
  "screener-list": {
    groups: ["screener"],
    description: "List saved screeners for the authenticated user.",
    method: "GET",
    path: () => "screener",
    args: {},
  },
  "screener-save": {
    groups: ["screener"],
    description: "Save a screener formula.",
    method: "POST",
    path: () => "screener",
    args: {
      name: {
        type: "string",
        required: true,
        description: "Screener name.",
      },
      description: {
        type: "string",
        description: "Optional screener description.",
      },
      scope: {
        type: "string[]",
        description: "Optional comma-separated scope values.",
      },
      formula: {
        type: "string",
        required: true,
        description: "Invezgo screener formula.",
      },
      category: {
        type: "string[]",
        required: true,
        description: "Comma-separated categories.",
      },
    },
    body: ({ name, description, scope, formula, category }) => ({
      name,
      description,
      scope,
      formula,
      category,
    }),
  },
  "screener-update": {
    groups: ["screener"],
    description: "Update one saved screener by id.",
    method: "PUT",
    path: ({ id }) => `screener/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Screener id.",
      },
      name: {
        type: "string",
        required: true,
        description: "Screener name.",
      },
      description: {
        type: "string",
        description: "Optional screener description.",
      },
      scope: {
        type: "string[]",
        description: "Optional comma-separated scope values.",
      },
      formula: {
        type: "string",
        required: true,
        description: "Invezgo screener formula.",
      },
      category: {
        type: "string[]",
        required: true,
        description: "Comma-separated categories.",
      },
    },
    body: ({ name, description, scope, formula, category }) => ({
      name,
      description,
      scope,
      formula,
      category,
    }),
  },
  "screener-delete": {
    groups: ["screener"],
    description: "Delete one saved screener by id.",
    method: "DELETE",
    path: ({ id }) => `screener/${encodeURIComponent(id)}`,
    args: {
      id: {
        type: "string",
        required: true,
        description: "Screener id.",
      },
    },
  },
  "list-index": {
    groups: ["invezgo-data"],
    description: "List all supported IDX indexes.",
    method: "GET",
    path: () => "analysis/list/index",
    args: {},
  },
  "index-chart": {
    groups: ["invezgo-data"],
    description: "Historical chart for one index and date range.",
    method: "GET",
    path: ({ code }) => `analysis/chart/index/${encodeURIComponent(code)}`,
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
    ],
    args: {
      code: indexCode,
      from: fromDate,
      to: toDate,
    },
  },
  "chart-multi-time": {
    groups: ["invezgo-data"],
    description: "Multi-timeframe chart for one stock or index code.",
    method: "GET",
    path: ({ code }) => `analysis/chart/multi-time/${encodeURIComponent(code)}`,
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "timeframe", arg: "timeframe" },
    ],
    args: {
      code: {
        type: "string",
        default: "BBCA",
        description: "Stock or index code, for example BBCA or COMPOSITE.",
      },
      from: fromDate,
      to: toDate,
      timeframe: {
        type: "string",
        default: "D",
        allowed: ["1", "5", "15", "30", "60", "D", "W", "M"],
        description: "Candle timeframe.",
      },
    },
  },
  "sector-stalker": {
    groups: ["invezgo-data"],
    description: "Sector or stock performance within a date range.",
    method: "GET",
    path: () => "analysis/stalker/sector",
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "base", arg: "base" },
      { key: "limit", arg: "limit" },
      { key: "filter", arg: "filter" },
    ],
    args: {
      from: fromDate,
      to: toDate,
      base: {
        type: "string",
        default: "COMPOSITE",
        allowed: ["COMPOSITE", "IDX30", "IDX80", "LQ45", "IDXFINANCE", "IDXENERGY"],
        description: "Base index filter.",
      },
      limit: {
        type: "integer",
        description: "Optional row limit.",
      },
      filter: {
        type: "string",
        description: "Optional stock code or name filter.",
      },
    },
  },
  "intraday-index": {
    groups: ["invezgo-data"],
    description: "Intraday chart for one index.",
    method: "GET",
    path: ({ code }) => `analysis/intraday-index/${encodeURIComponent(code)}`,
    query: [{ key: "market", arg: "market" }],
    args: {
      code: indexCode,
      market: marketType,
    },
  },
  "sector-rotation": {
    groups: ["invezgo-data"],
    description: "Sector rotation over a date range.",
    method: "GET",
    path: () => "analysis/sector/rotation",
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
    ],
    args: {
      from: fromDate,
      to: toDate,
    },
  },
  "broker-stalker": {
    groups: ["invezgo-data"],
    description: "Activity for one broker on one stock.",
    method: "GET",
    path: ({ broker, stock }) =>
      `analysis/stalker/broker/${encodeURIComponent(broker)}/${encodeURIComponent(stock)}`,
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "investor", arg: "investor" },
      { key: "market", arg: "market" },
    ],
    args: {
      broker: brokerCode,
      stock: {
        type: "string",
        required: true,
        description: "IDX stock code.",
      },
      from: fromDate,
      to: toDate,
      investor: investorType,
      market: marketType,
    },
  },
  "broker-stalker-list": {
    groups: ["invezgo-data"],
    description: "Stocks traded by one or more brokers in a date range.",
    method: "GET",
    path: ({ code }) => `analysis/stalker/list/${encodeURIComponent(code)}`,
    query: [
      { key: "from", arg: "from" },
      { key: "to", arg: "to" },
      { key: "investor", arg: "investor" },
      { key: "market", arg: "market" },
    ],
    args: {
      code: brokerCode,
      from: fromDate,
      to: toDate,
      investor: investorType,
      market: marketType,
    },
  },
  "price-table": {
    groups: ["invezgo-data"],
    description: "Price distribution table for one stock.",
    method: "GET",
    path: ({ code }) => `analysis/price-table/${encodeURIComponent(code)}`,
    query: [{ key: "date", arg: "date" }],
    args: {
      code: stockCode,
      date: singleDate,
    },
  },
  "time-table": {
    groups: ["invezgo-data"],
    description: "Time distribution table for one stock.",
    method: "GET",
    path: ({ code }) => `analysis/time-table/${encodeURIComponent(code)}`,
    query: [
      { key: "date", arg: "date" },
      { key: "range", arg: "range" },
    ],
    args: {
      code: stockCode,
      date: singleDate,
      range: {
        type: "integer",
        required: true,
        description: "Interval range in minutes.",
      },
    },
  },
};

export function listTools(group) {
  const names = Object.keys(toolDefinitions).sort();
  return names.filter((name) => {
    if (!group) {
      return true;
    }
    return toolDefinitions[name].groups.includes(group);
  });
}
