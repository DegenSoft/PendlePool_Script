(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[6316, 2661], {
    21440: function() {},
    73300: function(e, n, t) {
        "use strict";
        t.r(n),
        t.d(n, {
            Skeleton: function() {
                return i.Z
            },
            Stack: function() {
                return r.Z
            }
        });
        var i = t(76179)
          , r = t(21278)
    },
    98777: function(e, n, t) {
        "use strict";
        t.d(n, {
            Z: function() {
                return f
            }
        });
        var i = t(19506)
          , r = t(22971)
          , o = t(67016)
          , l = t(98184)
          , a = t(90343)
          , s = t(24261)
          , c = t(74611)
          , u = t(21278)
          , d = t(27796)
          , h = t(9514)
          , v = t.n(h)
          , p = e=>{
            let {tooltipContext: n="", clipboardValue: t, children: l, sx: a={}} = e
              , [c,u] = (0,
            r.useState)(!1);
            return (0,
            i.jsx)(s.Z, {
                followCursor: !0,
                title: c ? "Copied ".concat(n, " to the clipboard!") : "Click and copy ".concat(n, " to the clipboard"),
                children: (0,
                i.jsx)(o.Z, {
                    sx: {
                        display: "flex",
                        alignItems: "center",
                        "&:hover, input:hover": {
                            fontWeight: "bold",
                            cursor: "pointer"
                        },
                        ...a
                    },
                    onMouseLeave: ()=>u(!1),
                    children: (0,
                    i.jsx)(v(), {
                        text: t,
                        onCopy: ()=>u(!0),
                        children: l
                    })
                })
            })
        }
        ;
        let m = e=>{
            let {openExplorer: n, sx: t} = e;
            return (0,
            i.jsx)(s.Z, {
                title: "Open in Blockchain Explorer",
                children: (0,
                i.jsx)(l.Z, {
                    sx: {
                        cursor: "pointer",
                        ...t || {}
                    },
                    fontSize: "small",
                    onClick: n
                })
            })
        }
        ;
        var f = e=>{
            let {value: n="", networkId: t=1, shortFormat: l=!0, shortFormatLengthOnLeftSide: s=4, shortFormatLengthOnRightSide: h=4, showExplorerIcon: v=!1, showCopyIcon: f=!1, explorerIconPosition: g="start", openExplorerOnClick: x=!1, type: y="address", ..._} = e
              , b = (0,
            r.useMemo)(()=>l && n ? "".concat(n.slice(0, 2 + s), "...").concat(n.slice(0 - h)) : n, [n, l, s, h])
              , j = (0,
            r.useMemo)(()=>(0,
            d.jY)(t, n, y), [t, y, n])
              , E = (0,
            r.useCallback)(()=>{
                j && window.open(j, "_blank", "noopener")
            }
            , [j]);
            return b ? (0,
            i.jsxs)(o.Z, {
                sx: {
                    display: "flex",
                    alignItems: "center"
                },
                children: [v && j && (0,
                i.jsx)(m, {
                    openExplorer: E,
                    sx: {
                        ..._,
                        order: "end" === g ? 1 : 0,
                        fontSize: 18
                    }
                }), x ? (0,
                i.jsx)(o.Z, {
                    onClick: E,
                    sx: {
                        cursor: "pointer"
                    },
                    children: (0,
                    i.jsx)(c.Z, {
                        variant: "body2",
                        sx: {
                            ..._
                        },
                        children: b
                    })
                }) : (0,
                i.jsx)(p, {
                    clipboardValue: n,
                    children: (0,
                    i.jsxs)(u.Z, {
                        direction: "row",
                        spacing: 1,
                        display: "flex",
                        alignItems: "center",
                        children: [(0,
                        i.jsx)(c.Z, {
                            variant: "body2",
                            sx: {
                                ..._
                            },
                            children: b
                        }), f && (0,
                        i.jsx)(a.Z, {
                            sx: {
                                fontSize: 18
                            }
                        })]
                    })
                })]
            }) : (0,
            i.jsx)(i.Fragment, {})
        }
    },
    66574: function(e, n, t) {
        "use strict";
        t.d(n, {
            Z: function() {
                return o
            }
        });
        var i = t(19506)
          , r = t(4560);
        function o(e) {
            let {src: n, size: t} = e;
            return n && (0,
            i.jsx)(r.Z, {
                src: n,
                alt: n,
                height: null != t ? t : 24,
                width: null != t ? t : 24
            })
        }
    },
    55735: function(e, n, t) {
        "use strict";
        t.d(n, {
            Z: function() {
                return g
            }
        });
        var i = t(19506)
          , r = t(67016)
          , o = t(71237)
          , l = t(88721)
          , a = t(21278)
          , s = t(74611)
          , c = t(80063)
          , u = t(66574)
          , d = t(27796)
          , h = t(86224)
          , v = t(22971)
          , p = t(42590)
          , m = t(74872);
        let f = (0,
        p.j)("Wallet");
        function g(e) {
            let {text: n, networkId: t, requiredAddress: p, size: g="large"} = e
              , {switchNetwork: x} = (0,
            h.g0)()
              , {data: y} = (0,
            h.py)()
              , _ = (0,
            v.useCallback)(async()=>{
                try {
                    await (null == y ? void 0 : y.requestPermissions({
                        eth_accounts: {}
                    }))
                } catch (e) {}
            }
            , [y]);
            return (0,
            i.jsx)(c.NL.Custom, {
                children: e=>{
                    let {account: c, chain: h, openAccountModal: v, openChainModal: y, openConnectModal: b, mounted: j} = e
                      , E = j && c && h;
                    return f.debug("connected", {
                        connected: E,
                        mounted: j,
                        account: c,
                        chain: h
                    }),
                    (0,
                    i.jsx)(r.Z, {
                        ...!j && {
                            "aria-hidden": !0,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none"
                            }
                        },
                        sx: {
                            width: "100%"
                        },
                        children: (()=>{
                            if (!E)
                                return (0,
                                i.jsxs)(a.Z, {
                                    display: "flex",
                                    spacing: 1,
                                    children: [n ? (0,
                                    i.jsx)(o.Z, {
                                        variant: "outlined",
                                        fullWidth: !0,
                                        size: g,
                                        onClick: b,
                                        children: n
                                    }) : (0,
                                    i.jsx)(o.Z, {
                                        variant: "outlined",
                                        size: g,
                                        fullWidth: !0,
                                        startIcon: (0,
                                        i.jsx)(u.Z, {
                                            src: "/metamask.svg"
                                        }),
                                        onClick: b,
                                        children: "Connect your Wallet"
                                    }), (0,
                                    i.jsx)(l.default, {
                                        variant: "caption",
                                        href: "https://metamask.io/download",
                                        underline: "hover",
                                        target: "_blank",
                                        rel: "noopener",
                                        color: "primary.dark",
                                        textAlign: "center",
                                        children: "Need a wallet? Try MetaMask"
                                    })]
                                });
                            if (x && t && (null == h ? void 0 : h.id) !== t) {
                                var e;
                                return (0,
                                i.jsxs)(a.Z, {
                                    spacing: 1,
                                    children: [(0,
                                    i.jsx)(o.Z, {
                                        variant: "outlined",
                                        fullWidth: !0,
                                        onClick: ()=>x(t),
                                        children: "Switch Network"
                                    }), (0,
                                    i.jsxs)(s.Z, {
                                        variant: "caption",
                                        textAlign: "center",
                                        children: ["It looks like you are not connected to", " ", null === (e = m.g5.find(e=>e.chainId === t)) || void 0 === e ? void 0 : e.name, ". Switch network to proceed."]
                                    })]
                                })
                            }
                            return p && p !== c.address ? (0,
                            i.jsxs)(a.Z, {
                                spacing: 1,
                                children: [(0,
                                i.jsx)(o.Z, {
                                    variant: "outlined",
                                    fullWidth: !0,
                                    onClick: _,
                                    children: "Switch Wallet"
                                }), (0,
                                i.jsxs)(s.Z, {
                                    variant: "caption",
                                    textAlign: "center",
                                    children: ["It looks like you are not connected to the wallet in your profile. Switch to", " ", (0,
                                    d.Sy)(p, void 0, "middle"), " to proceed."]
                                })]
                            }) : (0,
                            i.jsx)(o.Z, {
                                variant: "outlined",
                                fullWidth: !0,
                                onClick: v,
                                endIcon: (0,
                                i.jsx)(u.Z, {
                                    src: "/metamask.svg"
                                }),
                                sx: {
                                    py: .5
                                },
                                children: (0,
                                i.jsxs)(a.Z, {
                                    display: "flex",
                                    alignItems: "start",
                                    flex: 1,
                                    children: [(0,
                                    i.jsx)(s.Z, {
                                        variant: "caption",
                                        color: "grey.700",
                                        children: "Wallet"
                                    }), (0,
                                    i.jsx)(s.Z, {
                                        variant: "h6",
                                        children: (0,
                                        d.Tg)(null == c ? void 0 : c.address)
                                    })]
                                })
                            })
                        }
                        )()
                    })
                }
            })
        }
    },
    7716: function(e, n, t) {
        "use strict";
        t.d(n, {
            Z: function() {
                return s
            }
        });
        var i = t(19506)
          , r = t(27796)
          , o = t(5662)
          , l = t(27446)
          , a = t.n(l);
        function s(e) {
            var n, t;
            let {id: l, name: s, imageSrc: c, size: u, square: d, ...h} = e;
            return (0,
            i.jsx)(i.Fragment, {
                children: c && (0,
                r.Or)(c) ? (0,
                i.jsx)(o.Z, {
                    alt: null !== (n = null != l ? l : s) && void 0 !== n ? n : "user-profile",
                    src: c,
                    imgProps: {
                        referrerPolicy: "no-referrer"
                    },
                    sx: {
                        border: "2px solid white",
                        height: u,
                        width: u,
                        ...h
                    }
                }) : (0,
                i.jsx)(o.Z, {
                    sx: {
                        border: "2px solid white",
                        backgroundColor: "background.paper",
                        height: u,
                        width: u,
                        ...h
                    },
                    children: (0,
                    i.jsx)(a(), {
                        name: null !== (t = null != l ? l : s) && void 0 !== t ? t : void 0,
                        size: u,
                        square: d,
                        variant: "beam"
                    })
                })
            })
        }
    },
    3432: function(e, n, t) {
        "use strict";
        t.r(n),
        t.d(n, {
            default: function() {
                return u
            }
        });
        var i = t(19506)
          , r = t(21278)
          , o = t(74611)
          , l = t(35609)
          , a = t(27796)
          , s = t(74872)
          , c = t(7716);
        function u(e) {
            var n, t;
            let {org: u, orgId: d, profile: h} = e
              , v = null == h ? void 0 : null === (n = h.media) || void 0 === n ? void 0 : n.avatar
              , p = (0,
            l.useRouter)()
              , m = !!u;
            return (0,
            i.jsxs)(r.Z, {
                direction: "row",
                display: "flex",
                alignItems: "start",
                spacing: .5,
                onClick: m ? ()=>p.push("/".concat(u)) : void 0,
                sx: {
                    cursor: m ? "pointer" : void 0
                },
                children: [(0,
                i.jsx)(c.Z, {
                    id: null !== (t = null != d ? d : u) && void 0 !== t ? t : null == h ? void 0 : h.displayName,
                    imageSrc: v,
                    size: 24,
                    borderRadius: 1,
                    square: !0
                }), (0,
                i.jsx)(o.Z, {
                    variant: "body1",
                    children: (null == h ? void 0 : h.displayName) && (0,
                    a.Sy)(h.displayName, s.ac)
                })]
            })
        }
    },
    8129: function(e, n, t) {
        "use strict";
        t.r(n),
        t.d(n, {
            default: function() {
                return e_
            }
        });
        var i, r, o, l, a, s, c = t(19506), u = t(87455), d = t(35716), h = t(51263), v = t(21278), p = t(71237), m = t(74611), f = t(75863), g = t(55735), x = t(86224), y = t(22971), _ = t(35733), b = t.n(_), j = t(46686), E = t(85736), k = t(2004), w = t(87118);
        let C = (e,n)=>(0,
        w.D)({
            mutationFn: n=>{
                let {provider: t, listingId: i, quantity: r, address: o} = n;
                return I(null != t ? t : e, i, r, o)
            }
            ,
            onSuccess: (e,n)=>{}
            ,
            onError: (e,n)=>{}
            ,
            ...null != n ? n : {}
        })
          , I = async(e,n,t,i)=>k.LY.purchaseIntentsPost({
            body: {
                provider: e,
                listingId: n,
                quantity: t,
                buyer: {
                    ethAddress: i
                }
            }
        })
          , Z = async e=>k.aB.freeMintsFreeMintIdGet({
            freeMintId: e
        });
        var S = t(74872);
        let A = (e,n)=>{
            switch (n.type) {
            case "ERROR":
                return {
                    loading: !1,
                    error: n.payload.error
                };
            case "CREATE_PURCHASE_INTENT_SUCCESS":
                return {
                    loading: !0,
                    error: null,
                    purchaseIntent: n.payload
                };
            case "RESET":
                return {
                    loading: !1,
                    error: null
                };
            case "FREE_MINT_STATUS_UPDATE":
                return {
                    ...e,
                    freeMintOutput: n.payload.freeMintOutput
                };
            case "FREE_MINT_COMPLETE":
                return {
                    loading: !1,
                    error: null,
                    freeMintOutput: n.payload.freeMintOutput,
                    complete: !0
                };
            default:
                return e
            }
        }
          , F = (e,n)=>{
            var t, i, r;
            let[o,l] = (0,
            y.useReducer)(A, {
                loading: !1,
                error: null
            })
              , {data: a} = (0,
            E.a)({
                queryKey: ["free-mint", null == o ? void 0 : null === (t = o.purchaseIntent) || void 0 === t ? void 0 : t.id],
                queryFn: ()=>{
                    var e, n;
                    return Z(null !== (n = null == o ? void 0 : null === (e = o.purchaseIntent) || void 0 === e ? void 0 : e.id) && void 0 !== n ? n : "")
                }
                ,
                refetchInterval: 5e3,
                enabled: !!(null == o ? void 0 : null === (i = o.purchaseIntent) || void 0 === i ? void 0 : i.id)
            });
            (0,
            y.useEffect)(()=>{
                var e, n, t;
                if (!(null == a ? void 0 : null === (e = a.freeMintOutputs) || void 0 === e ? void 0 : e.length))
                    return;
                if ((null == a ? void 0 : null === (n = a.freeMintOutputs) || void 0 === n ? void 0 : n.length) > 1) {
                    console.warn("Not implemented yet");
                    return
                }
                let i = null == a ? void 0 : a.freeMintOutputs[0];
                "COMPLETED" === i.mintStatus ? l({
                    type: "FREE_MINT_COMPLETE",
                    payload: {
                        freeMintOutput: i
                    }
                }) : i.mintStatus !== (null === (t = o.freeMintOutput) || void 0 === t ? void 0 : t.mintStatus) && l({
                    type: "FREE_MINT_STATUS_UPDATE",
                    payload: {
                        freeMintOutput: i
                    }
                })
            }
            , [null == a ? void 0 : a.freeMintOutputs, null === (r = o.freeMintOutput) || void 0 === r ? void 0 : r.mintStatus]),
            (0,
            y.useEffect)(()=>{
                var n, t;
                (null == o ? void 0 : null === (n = o.purchaseIntent) || void 0 === n ? void 0 : n.id) && (null == o ? void 0 : null === (t = o.purchaseIntent) || void 0 === t ? void 0 : t.address) !== e && l({
                    type: "RESET"
                })
            }
            , [e, null == o ? void 0 : o.purchaseIntent]);
            let {mutate: s, isPending: c} = C(n.paymentProviders.includes("BETA_FREE_MINT") ? "BETA_FREE_MINT" : "ORGANIZATION", {
                onSuccess: (n,t)=>{
                    l({
                        type: "CREATE_PURCHASE_INTENT_SUCCESS",
                        payload: {
                            ...n,
                            address: e
                        }
                    })
                }
                ,
                onError: async e=>{
                    var n, t, i, r, o, a;
                    let s = await (null == e ? void 0 : null === (t = e.response) || void 0 === t ? void 0 : null === (n = t.json) || void 0 === n ? void 0 : n.call(t));
                    l({
                        type: "ERROR",
                        payload: {
                            error: (null === (i = String(null === (r = s.error) || void 0 === r ? void 0 : r.detail)) || void 0 === i ? void 0 : i.includes("exceeds limit")) ? S.xE : (null === (o = String(null === (a = s.error) || void 0 === a ? void 0 : a.detail)) || void 0 === o ? void 0 : o.includes("Not allowed")) ? S.H3 : S.t5
                        }
                    })
                }
            });
            return {
                state: o,
                createPurchaseIntent: s,
                createPurchaseIntentLoading: c,
                freeMintStatus: a,
                address: e
            }
        }
        ;
        var T = t(67016)
          , N = t(76343)
          , M = t(98777);
        function D(e) {
            let {txHash: n} = e;
            return (0,
            c.jsxs)(v.Z, {
                spacing: 2,
                sx: {
                    width: "100%"
                },
                children: [(0,
                c.jsxs)(T.Z, {
                    sx: {
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%"
                    },
                    children: [(0,
                    c.jsx)(N.Z, {
                        disableShrink: !0,
                        size: 220,
                        sx: {
                            color: "secondary.main",
                            "& .MuiCircularProgress-circle": {
                                strokeLinecap: "round"
                            }
                        }
                    }), (0,
                    c.jsxs)(T.Z, {
                        sx: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            p: 10,
                            flexDirection: "column",
                            gap: 2
                        },
                        children: [(0,
                        c.jsx)(m.Z, {
                            variant: "h3",
                            lineHeight: 1.25,
                            children: "Processing Claim"
                        }), n && (0,
                        c.jsx)(M.Z, {
                            value: n,
                            type: "tx",
                            openExplorerOnClick: !0,
                            showExplorerIcon: !0
                        })]
                    })]
                }), (0,
                c.jsx)(m.Z, {
                    variant: "body2",
                    textAlign: "center",
                    children: "This is normally quick, but can sometimes take a few minutes depending on network activity. Feel free to navigate to other pages while you wait."
                })]
            })
        }
        var P = t(27243)
          , L = t(16196)
          , O = t(76107)
          , R = t(72458)
          , B = t(15400);
        function W(e) {
            let {checkoutLoading: n, listing: t, address: i, checkout: r} = e
              , o = t.maxQuantityPerTx
              , l = R.z.object({
                quantity: R.z.number().min(1).refine(e=>o && e <= o)
            }).required()
              , a = (0,
            O.TA)({
                initialValues: {
                    quantity: 1
                },
                enableReinitialize: !0,
                validationSchema: (0,
                B.yT)(l),
                onSubmit: async e=>{
                    r({
                        listingId: t.id,
                        quantity: a.values.quantity,
                        address: i
                    })
                }
            });
            return (0,
            c.jsx)("form", {
                onSubmit: a.handleSubmit,
                children: (0,
                c.jsxs)(v.Z, {
                    spacing: 1,
                    direction: "row",
                    display: "flex",
                    alignItems: "end",
                    children: [(0,
                    c.jsx)(L.Z, {
                        variant: "outlined",
                        id: "quantity",
                        name: "quantity",
                        value: a.values.quantity,
                        label: "Quantity",
                        type: "number",
                        InputProps: {
                            inputProps: {
                                min: "1",
                                max: o ? String(o) : void 0
                            }
                        },
                        onChange: a.handleChange,
                        onBlur: a.handleBlur,
                        size: "small",
                        sx: {
                            width: 76
                        },
                        disabled: 1 === o
                    }), (0,
                    c.jsx)(P.Z, {
                        sx: {
                            flex: 1
                        },
                        variant: "contained",
                        size: "large",
                        color: "secondary",
                        type: "submit",
                        disabled: !!a.errors.quantity || !a.values.quantity || !i,
                        loading: n,
                        children: "Confirm and Claim"
                    })]
                })
            })
        }
        function z(e) {
            var n, t, i, r;
            let {listing: o, address: l, handleSuccess: a, handleError: s} = e
              , u = (0,
            j.f)()
              , h = b()(null == o ? void 0 : o.startTime).isBefore(b()())
              , {state: p, createPurchaseIntent: m, createPurchaseIntentLoading: x} = F(l, o)
              , _ = (0,
            y.useMemo)(()=>{
                var e;
                return !!(null === (e = p.freeMintOutput) || void 0 === e ? void 0 : e.txHash)
            }
            , [null === (n = p.freeMintOutput) || void 0 === n ? void 0 : n.txHash]);
            return ((0,
            y.useEffect)(()=>{
                if ((null == p ? void 0 : p.complete) && (null == a || a()),
                _) {
                    var e;
                    d.S.checkoutModalProps = {
                        ...d.S.checkoutModalProps,
                        txHash: (null === (e = p.freeMintOutput) || void 0 === e ? void 0 : e.txHash) || void 0
                    }
                }
            }
            , [s, a, null == p ? void 0 : p.complete, p.error, null === (t = p.freeMintOutput) || void 0 === t ? void 0 : t.txHash, p.loading, _]),
            h && u) ? (null == p ? void 0 : p.loading) ? (0,
            c.jsx)(D, {
                txHash: null === (r = p.freeMintOutput) || void 0 === r ? void 0 : r.txHash
            }) : (0,
            c.jsxs)(v.Z, {
                spacing: 2,
                children: [(0,
                c.jsx)(g.Z, {
                    text: "Connect Wallet",
                    networkId: null == o ? void 0 : o.networkId
                }), (0,
                c.jsx)(W, {
                    address: l,
                    listing: o,
                    checkoutLoading: x || p.loading || !!(null === (i = p.purchaseIntent) || void 0 === i ? void 0 : i.id),
                    checkout: m
                }), p.error && (0,
                c.jsx)(f.Z, {
                    severity: "error",
                    children: p.error
                })]
            }) : null
        }
        var q = JSON.parse('[{"inputs":[{"components":[{"internalType":"address","name":"netRecipient","type":"address"},{"internalType":"address","name":"initialRecipient","type":"address"},{"internalType":"uint256","name":"initialRecipientAmount","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"currency","type":"address"}],"internalType":"struct MintVoucherVerification.MintVoucher","name":"voucher","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"mintWithVoucher","outputs":[],"stateMutability":"payable","type":"function"}]')
          , H = JSON.parse('[{"inputs":[{"components":[{"internalType":"address","name":"netRecipient","type":"address"},{"internalType":"address","name":"initialRecipient","type":"address"},{"internalType":"uint256","name":"initialRecipientAmount","type":"uint256"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"}],"internalType":"struct MintVoucherVerificationV2.MintVoucherV2","name":"voucher","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"mintWithVoucher","outputs":[],"stateMutability":"payable","type":"function"}]')
          , K = t(27796);
        function U(e) {
            let {txHash: n, networkId: t} = e;
            return (0,
            c.jsxs)(f.Z, {
                severity: "info",
                children: ["Your NFT is being minted through", " ", (0,
                c.jsx)(M.Z, {
                    type: "tx",
                    value: n,
                    networkId: t,
                    showExplorerIcon: !0,
                    openExplorerOnClick: !0,
                    color: "primary.main",
                    fontWeight: 600
                }), "Please allow 1-2 minutes while the blockchain is confirming the transaction."]
            })
        }
        function V(e) {
            var n;
            let {voucherData: t, onError: i, onSuccess: r} = e
              , {checkoutModalProps: o} = (0,
            u.R)(d.S)
              , [l,a] = (0,
            y.useState)(null == o ? void 0 : o.txHash)
              , [s,h] = (0,
            y.useState)(void 0);
            (0,
            x.BX)({
                hash: l,
                enabled: !!l,
                onSuccess(e) {
                    "success" === e.status ? r(e) : i({
                        shortMessage: S.v9
                    })
                },
                onError(e) {
                    i(e)
                }
            });
            let v = q
              , p = [t.voucher.net_recipient, t.voucher.initial_recipient, t.voucher.initial_recipient_amount, t.voucher.quantity, t.voucher.nonce, t.voucher.expiry, t.voucher.price, t.voucher.token_id, t.voucher.currency];
            t.voucher.token_uri && (v = H,
            p.push(t.voucher.token_uri));
            let m = t.voucher.price && t.voucher.quantity ? BigInt(t.voucher.price) * BigInt(t.voucher.quantity) : void 0
              , {config: f} = (0,
            x.PJ)({
                address: t.contract,
                abi: v,
                functionName: "mintWithVoucher",
                chainId: t.network_id,
                args: [p, t.signature],
                value: m,
                scopeKey: s,
                enabled: !l,
                onError(e) {
                    let n;
                    n = (null == e ? void 0 : e.message) && e.message.includes("0x9da17a68") ? "You have recently performed a mint and must wait a short amount of time before trying again. Please try again shortly." : (0,
                    K.iN)(e),
                    i({
                        ...e,
                        shortMessage: n
                    })
                }
            });
            (null == f ? void 0 : null === (n = f.request) || void 0 === n ? void 0 : n.gas) && (f.request.gas < S.cC || f.request.gas > S.LA) && i({
                shortMessage: "Gas estimation does not look right."
            });
            let g = (0,
            y.useMemo)(()=>{
                var e;
                return (null == f ? void 0 : null === (e = f.request) || void 0 === e ? void 0 : e.gas) ? {
                    ...f,
                    request: {
                        ...f.request,
                        gas: (0,
                        K.bu)(f.request.gas)
                    }
                } : f
            }
            , [f])
              , {writeAsync: _, reset: b} = (0,
            x.GG)({
                ...g,
                onSuccess(e) {
                    a(e.hash),
                    d.S.checkoutModalProps = {
                        ...d.S.checkoutModalProps,
                        txHash: e.hash
                    }
                },
                onError(e) {
                    i(e)
                }
            });
            return (0,
            y.useEffect)(()=>{
                (async()=>{
                    _ && await _()
                }
                )()
            }
            , [_]),
            (0,
            y.useEffect)(()=>{
                h((0,
                K.k$)()),
                t || b()
            }
            , [b, t]),
            (0,
            c.jsx)(c.Fragment, {
                children: l && (0,
                c.jsx)(U, {
                    txHash: l,
                    networkId: t.network_id
                })
            })
        }
        function G(e) {
            let {listing: n, address: t, handleSuccess: i, handleError: r} = e
              , o = (0,
            j.f)()
              , l = b()(null == n ? void 0 : n.startTime).isBefore(b()())
              , [a,s] = (0,
            y.useState)({
                loading: !1,
                error: null
            })
              , [h,v] = (0,
            y.useState)(null)
              , {checkoutModalProps: p} = (0,
            u.R)(d.S)
              , {txHash: m} = null != p ? p : {}
              , g = (0,
            y.useCallback)(e=>{
                s(n=>({
                    ...n,
                    loading: !1,
                    error: (0,
                    K.iN)(e)
                })),
                v(null),
                null == r || r(e)
            }
            , [r])
              , x = (0,
            y.useCallback)(e=>{
                s(e=>({
                    ...e,
                    loading: !1,
                    error: null
                })),
                v(null),
                d.S.checkoutModalProps = {
                    ...d.S.checkoutModalProps,
                    txReceipt: e
                },
                null == i || i()
            }
            , [i])
              , {mutate: _, isPending: E} = C("MINT_VOUCHER", {
                onSuccess: (e,n)=>{
                    s(e=>({
                        ...e,
                        loading: !0,
                        error: null
                    })),
                    v(e.data)
                }
                ,
                onError: async e=>{
                    var n, t, i, r, o, l;
                    let a;
                    let c = await (null == e ? void 0 : null === (t = e.response) || void 0 === t ? void 0 : null === (n = t.json) || void 0 === n ? void 0 : n.call(t));
                    a = (null === (i = String(null === (r = c.error) || void 0 === r ? void 0 : r.detail)) || void 0 === i ? void 0 : i.includes("exceeds limit")) ? S.xE : (null === (o = String(null === (l = c.error) || void 0 === l ? void 0 : l.detail)) || void 0 === o ? void 0 : o.includes("Not allowed")) ? S.H3 : S.t5,
                    s(e=>({
                        ...e,
                        loading: !1,
                        error: a
                    }))
                }
            });
            return l && o ? (0,
            c.jsxs)(c.Fragment, {
                children: [(0,
                c.jsx)(W, {
                    address: t,
                    listing: n,
                    checkoutLoading: E || a.loading || !!m,
                    checkout: _
                }), h && (0,
                c.jsx)(V, {
                    voucherData: h,
                    onError: g,
                    onSuccess: x
                }), a.error && (0,
                c.jsx)(f.Z, {
                    severity: "error",
                    children: a.error
                })]
            }) : null
        }
        var Y = t(16345)
          , Q = t(18505);
        let $ = e=>{
            var n;
            let t = (0,
            x.t_)()
              , {data: i, isLoading: r, isError: o} = (0,
            E.a)({
                queryKey: ["Block", null !== (n = null == e ? void 0 : e.toString()) && void 0 !== n ? n : "no block number"],
                queryFn: ()=>t.getBlock({
                    blockNumber: e
                }),
                enabled: !!e,
                ...S.cu
            });
            return {
                data: i,
                isLoading: r && !!e,
                isError: o
            }
        }
        ;
        var J = t(98550)
          , X = t.n(J);
        let ee = (e,n,t,i,r,o)=>{
            let l = n ? [n] : void 0
              , a = {
                organizationId: e,
                collectionIds: l,
                networkIds: t ? [t] : void 0,
                tokenIds: i ? [i] : void 0,
                cursor: r
            }
              , {data: s, refetch: c} = (0,
            E.a)({
                queryKey: ["Items", null != e ? e : n, t, i, r],
                queryFn: ()=>k.LY.itemsGet(a),
                enabled: !!l || !!e,
                ...null != o ? o : {}
            });
            return {
                data: s,
                refetch: c
            }
        }
        ;
        var en = t(55802);
        function et(e) {
            var n, t, i, r, o, l, a, s, u, d, h, p, g, x, _, j, E, k, w, C;
            let I, {listing: Z, item: A, txReceipt: F, creatorProfile: T} = e, [N,M] = (0,
            y.useState)(void 0), {data: D} = $(null == F ? void 0 : F.blockNumber), P = (null == A ? void 0 : A.tokenId) ? Number(A.tokenId) : (null == F ? void 0 : null === (i = F.logs) || void 0 === i ? void 0 : null === (t = i[0]) || void 0 === t ? void 0 : null === (n = t.topics) || void 0 === n ? void 0 : n[3]) ? Number(null == F ? void 0 : null === (l = F.logs) || void 0 === l ? void 0 : null === (o = l[0]) || void 0 === o ? void 0 : null === (r = o.topics) || void 0 === r ? void 0 : r[3]) : void 0, {data: L} = ee(void 0, null !== (a = null == Z ? void 0 : Z.collectionId) && void 0 !== a ? a : void 0, null !== (s = null == Z ? void 0 : Z.networkId) && void 0 !== s ? s : void 0, P, void 0, {
                enabled: !A && !!P,
                refetchInterval: e=>(null == e ? void 0 : e.totalResults) !== 1 && 2e3
            });
            try {
                (null == F ? void 0 : null === (h = F.logs) || void 0 === h ? void 0 : null === (d = h[0]) || void 0 === d ? void 0 : null === (u = d.topics) || void 0 === u ? void 0 : u[3]) && (I = (0,
                en.Ou)(null == F ? void 0 : null === (E = F.logs) || void 0 === E ? void 0 : null === (j = E[0]) || void 0 === j ? void 0 : null === (_ = j.topics) || void 0 === _ ? void 0 : _[3])),
                !A && (null == L ? void 0 : L.totalResults) === 1 && (null == F ? void 0 : null === (x = F.logs) || void 0 === x ? void 0 : null === (g = x[0]) || void 0 === g ? void 0 : null === (p = g.topics) || void 0 === p ? void 0 : p[2]) && (A = L.results[0],
                I = (0,
                en.Ou)(null == F ? void 0 : null === (C = F.logs) || void 0 === C ? void 0 : null === (w = C[0]) || void 0 === w ? void 0 : null === (k = w.topics) || void 0 === k ? void 0 : k[2]))
            } catch (e) {}
            return ((0,
            y.useEffect)(()=>{
                (null == D ? void 0 : D.timestamp) && M(D.timestamp)
            }
            , [null == D ? void 0 : D.timestamp]),
            A) ? (0,
            c.jsx)(f.Z, {
                icon: (0,
                c.jsx)(Q.default, {
                    sx: {
                        color: "text.primary"
                    }
                }),
                severity: "info",
                variant: "outlined",
                sx: {
                    border: "none",
                    color: "text.primary",
                    p: 0
                },
                children: (0,
                c.jsxs)(v.Z, {
                    spacing: .5,
                    children: [A && (0,
                    c.jsx)(m.Z, {
                        variant: "body2",
                        children: (0,
                        K.Sy)((null == A ? void 0 : A.attributes).title, S.ac)
                    }), (null == T ? void 0 : T.displayName) && (0,
                    c.jsx)(m.Z, {
                        variant: "body2",
                        fontWeight: 500,
                        children: "by ".concat((0,
                        K.Sy)(T.displayName, S.ac))
                    }), !!N && (0,
                    c.jsx)(m.Z, {
                        variant: "body2",
                        fontWeight: 500,
                        children: "Transferred ".concat(b().unix(Number(N)).format("LT L"))
                    }), A && I && (0,
                    c.jsx)(m.Z, {
                        variant: "body2",
                        fontWeight: 500,
                        children: "To ".concat((0,
                        K.Sy)(I, void 0, "middle"))
                    })]
                })
            }) : (0,
            c.jsx)(Y.Z, {})
        }
        b().extend(X()),
        (i = l || (l = {})).SAME_LINK_FOR_ALL = "SAME_LINK_FOR_ALL",
        i.UNIQUE_LINK_FOR_EACH = "UNIQUE_LINK_FOR_EACH",
        i.NO_CLAIM = "NO_CLAIM",
        i.EMAIL_AND_PIN_CODE = "EMAIL_AND_PIN_CODE",
        i.GLOBAL_TOKEN = "GLOBAL_TOKEN",
        i.UNIQUE_TOKEN = "UNIQUE_TOKEN",
        i.UNIQUE_TOKEN_AND_ADDRESS = "UNIQUE_TOKEN_AND_ADDRESS",
        i.GLOBAL_TOKEN_AND_ADDRESS = "GLOBAL_TOKEN_AND_ADDRESS",
        i.UNIQUE_TOKEN_AND_EMAIL = "UNIQUE_TOKEN_AND_EMAIL",
        i.GLOBAL_TOKEN_AND_EMAIL = "GLOBAL_TOKEN_AND_EMAIL",
        i.ITEM_ID_AND_EMAIL = "ITEM_ID_AND_EMAIL",
        i.ITEM_ID_AND_ADDRESS = "ITEM_ID_AND_ADDRESS",
        (r = a || (a = {})).NO_CHECK = "NO_CHECK",
        r.CHECK_PIN = "CHECK_PIN",
        r.CHECK_EMAIL = "CHECK_EMAIL";
        let ei = R.z.object({
            email: R.z.string().email()
        }).required();
        function er(e) {
            let {redeemDropClaim: n, redeemDropClaimLoading: t, address: i, claimToken: r} = e
              , o = (0,
            O.TA)({
                initialValues: {
                    email: ""
                },
                enableReinitialize: !0,
                validationSchema: (0,
                B.yT)(ei),
                onSubmit: async e=>{
                    n({
                        claimToken: r,
                        toAddress: i,
                        email: e.email
                    })
                }
            });
            return (0,
            c.jsx)("form", {
                onSubmit: o.handleSubmit,
                children: (0,
                c.jsxs)(v.Z, {
                    spacing: 1,
                    children: [(0,
                    c.jsx)(L.Z, {
                        fullWidth: !0,
                        variant: "outlined",
                        id: "email",
                        name: "email",
                        placeholder: "Enter your email",
                        value: o.values.email,
                        onChange: o.handleChange,
                        onBlur: o.handleBlur,
                        sx: {
                            borderColor: "text.primary",
                            "& .MuiInputBase-root": {
                                p: "10px 16px",
                                height: 48
                            },
                            "& fieldset": {
                                borderColor: "text.primary"
                            }
                        }
                    }), (0,
                    c.jsx)(P.Z, {
                        variant: "contained",
                        fullWidth: !0,
                        size: "large",
                        color: "secondary",
                        type: "submit",
                        disabled: !!o.errors.email || !o.values.email,
                        loading: t,
                        children: "Confirm Email"
                    }), (0,
                    c.jsx)(m.Z, {
                        variant: "caption",
                        textAlign: "center",
                        children: "Please enter your email above to confirm that you are on the claim list."
                    })]
                })
            })
        }
        t(34213);
        var eo = t(97916)
          , el = (0,
        eo.$)("d124558f2e9d4f95105fd75d0dffb5dfe8b8d5ca")
          , ea = (0,
        eo.$)("28f8b4c202cd9260edb3e76d6ecac706753bc6c0");
        let es = e=>(0,
        w.D)({
            mutationFn: e=>{
                let {claimToken: n, toAddress: t, email: i, secret: r} = e;
                return ea(n, t, i, r)
            }
            ,
            onSuccess: (e,n)=>{}
            ,
            onError: (e,n)=>{}
            ,
            ...null != e ? e : {}
        })
          , ec = e=>(0,
        w.D)({
            mutationFn: e=>{
                let {claimToken: n} = e;
                return eu(n)
            }
            ,
            onSuccess: (e,n)=>{}
            ,
            onError: (e,n)=>{}
            ,
            ...null != e ? e : {}
        })
          , eu = async e=>await k.LY.emailClaimsClaimTokenVerifyPost({
            claimToken: e
        })
          , ed = e=>(0,
        w.D)({
            mutationFn: e=>{
                let {claimToken: n, pincode: t, address: i} = e;
                return el(n, t, i)
            }
            ,
            onSuccess: (e,n)=>{}
            ,
            onError: (e,n)=>{}
            ,
            ...null != e ? e : {}
        });
        (o = s || (s = {}))[o.SEND_PIN = 0] = "SEND_PIN",
        o[o.CHECK_PIN = 1] = "CHECK_PIN";
        let eh = R.z.object({
            pincode: R.z.string().length(6)
        }).required();
        function ev(e) {
            let {claimToken: n, address: t, redeemCoreClaim: i, redeemCoreClaimLoading: r} = e
              , [o,l] = (0,
            y.useState)(0)
              , {mutate: a, isPending: s} = ec({
                onSuccess: ()=>{
                    l(1)
                }
            })
              , u = (0,
            O.TA)({
                initialValues: {
                    pincode: ""
                },
                enableReinitialize: !0,
                validationSchema: (0,
                B.yT)(eh),
                onSubmit: async e=>{
                    i({
                        claimToken: n,
                        pincode: e.pincode,
                        address: t
                    })
                }
            });
            return (0,
            c.jsxs)(c.Fragment, {
                children: [0 === o && (0,
                c.jsxs)(v.Z, {
                    spacing: 1,
                    children: [(0,
                    c.jsx)(P.Z, {
                        variant: "contained",
                        fullWidth: !0,
                        size: "large",
                        color: "secondary",
                        onClick: ()=>{
                            a({
                                claimToken: n
                            })
                        }
                        ,
                        loading: s,
                        children: "Send PIN"
                    }), (0,
                    c.jsx)(m.Z, {
                        variant: "caption",
                        textAlign: "center",
                        children: "A Confirmation PIN number will be sent to your email address to verify ownership."
                    })]
                }), 1 === o && (0,
                c.jsx)("form", {
                    onSubmit: u.handleSubmit,
                    children: (0,
                    c.jsxs)(v.Z, {
                        spacing: 1,
                        children: [(0,
                        c.jsx)(L.Z, {
                            fullWidth: !0,
                            variant: "outlined",
                            id: "pincode",
                            name: "pincode",
                            placeholder: "Enter pincode",
                            value: u.values.pincode,
                            onChange: u.handleChange,
                            onBlur: u.handleBlur,
                            sx: {
                                borderColor: "text.primary",
                                "& .MuiInputBase-root": {
                                    p: "10px 16px",
                                    height: 48
                                },
                                "& fieldset": {
                                    borderColor: "text.primary"
                                }
                            }
                        }), (0,
                        c.jsx)(P.Z, {
                            variant: "contained",
                            fullWidth: !0,
                            size: "large",
                            color: "secondary",
                            type: "submit",
                            loading: r,
                            disabled: !!u.errors.pincode || !u.values.pincode,
                            children: "Confirm PIN"
                        }), (0,
                        c.jsx)(f.Z, {
                            severity: "success",
                            children: "PIN code successfully sent!"
                        }), (0,
                        c.jsx)(m.Z, {
                            variant: "caption",
                            textAlign: "center",
                            children: "Copy and paste the verification PIN you received in your email inbox."
                        })]
                    })
                })]
            })
        }
        var ep = t(4625);
        function em(e) {
            let {message: n="Something went wrong. Please try again later."} = e;
            return (0,
            c.jsx)(f.Z, {
                severity: "error",
                children: n
            })
        }
        var ef = t(42590)
          , eg = t(44319)
          , ex = t(18247);
        function ey(e) {
            let {sx: n} = e;
            return (0,
            c.jsxs)(v.Z, {
                spacing: 1,
                sx: {
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: "background.paper",
                    width: "100%",
                    alignItems: "center",
                    ...n || {}
                },
                children: [(0,
                c.jsx)(m.Z, {
                    variant: "h5",
                    textAlign: "center",
                    color: "primary.light",
                    sx: {
                        ...n || {}
                    },
                    children: "Want to create a drop just like this?"
                }), (0,
                c.jsx)(ex.default, {})]
            })
        }
        function e_(e) {
            let {creatorProfile: n} = e
              , {checkoutModalProps: t} = (0,
            u.R)(d.S)
              , {open: i, onCancel: r, listing: o, claimToken: l, width: a=320, height: s} = null != t ? t : {}
              , {checkoutModalClickaway: v} = (0,
            eg.g)()
              , p = (0,
            y.useCallback)((e,n)=>{
                n && "backdropClick" == n || null == r || r()
            }
            , [r]);
            return (0,
            c.jsx)(h.Z, {
                sx: {
                    display: "grid",
                    zIndex: 1,
                    "& .MuiDialog-paper": {
                        width: {
                            xs: "100%",
                            md: a
                        },
                        height: s,
                        borderRadius: 2,
                        m: 2,
                        p: 2,
                        position: {
                            xs: "static",
                            md: "absolute"
                        },
                        top: 270,
                        right: 0,
                        display: "flex",
                        overflow: "hidden"
                    },
                    "& .MuiDialog-container": {
                        width: "100%",
                        height: "100vh",
                        maxWidth: "md",
                        position: "relative",
                        alignSelf: "center",
                        justifySelf: "center"
                    }
                },
                open: !!i,
                onClose: v ? r : p,
                children: (0,
                c.jsxs)(ep.SV, {
                    fallback: (0,
                    c.jsx)(em, {}),
                    children: [o && (0,
                    c.jsx)(eb, {
                        creatorProfile: n
                    }), l && (0,
                    c.jsx)(ej, {
                        creatorProfile: n
                    })]
                })
            })
        }
        (0,
        ef.j)("CheckoutModal");
        let eb = e=>{
            let {creatorProfile: n} = e
              , {checkoutModalProps: t} = (0,
            u.R)(d.S)
              , {onCancel: i, onSuccess: r, onError: o, txHash: l, txReceipt: a, listing: s, gasPaidByOrg: h, item: y, state: _, error: b} = null != t ? t : {}
              , {chain: j} = (0,
            x.LN)()
              , {address: E} = (0,
            x.mA)()
              , {phosphorHubCheckout: k} = (0,
            eg.g)();
            if ((0,
            x.BX)({
                hash: l,
                enabled: !!l,
                onSuccess(e) {
                    "success" === e.status ? (d.S.checkoutModalProps = {
                        ...d.S.checkoutModalProps,
                        txReceipt: e
                    },
                    null == r || r()) : null == o || o({
                        shortMessage: S.v9
                    })
                },
                onError(e) {
                    null == o || o(e)
                }
            }),
            !s || (null == j ? void 0 : j.id) !== s.networkId || !E)
                return (0,
                c.jsxs)(v.Z, {
                    spacing: 2,
                    children: [(0,
                    c.jsx)(g.Z, {
                        text: "Connect Wallet",
                        networkId: null == s ? void 0 : s.networkId
                    }), (0,
                    c.jsx)(p.Z, {
                        variant: "contained",
                        fullWidth: !0,
                        size: "large",
                        color: "secondary",
                        disabled: !0,
                        children: "Claim Now"
                    })]
                });
            if ("success" === _) {
                var w;
                return (0,
                c.jsxs)(v.Z, {
                    spacing: 2,
                    children: [(0,
                    c.jsx)(m.Z, {
                        variant: "body2",
                        children: (0,
                        K.NR)(null !== (w = null == n ? void 0 : n.displayName) && void 0 !== w ? w : "")
                    }), (0,
                    c.jsx)(et, {
                        listing: s,
                        item: y,
                        txReceipt: a,
                        creatorProfile: n
                    }), (0,
                    c.jsx)(p.Z, {
                        variant: "outlined",
                        size: "large",
                        fullWidth: !0,
                        onClick: i,
                        children: "Dismiss"
                    }), k && (0,
                    c.jsx)(ey, {
                        sx: {
                            fontSize: 14
                        }
                    })]
                })
            }
            return "error" === _ ? (0,
            c.jsx)(f.Z, {
                severity: "error",
                children: b
            }) : l ? (0,
            c.jsx)(D, {
                txHash: l
            }) : h ? (0,
            c.jsx)(z, {
                listing: s,
                address: E,
                handleSuccess: r,
                handleError: o
            }) : (0,
            c.jsxs)(v.Z, {
                spacing: 2,
                children: [(0,
                c.jsx)(g.Z, {
                    text: "Connect Wallet",
                    networkId: null == s ? void 0 : s.networkId
                }), (0,
                c.jsx)(G, {
                    listing: s,
                    address: E,
                    handleSuccess: r,
                    handleError: o
                })]
            })
        }
          , ej = e=>{
            let {creatorProfile: n} = e
              , {checkoutModalProps: t} = (0,
            u.R)(d.S)
              , {onCancel: i, onSuccess: r, onError: o, onDismiss: l, claimToken: s, securityOption: h, item: y, state: _, error: b} = null != t ? t : {}
              , {chain: j} = (0,
            x.LN)()
              , {address: E} = (0,
            x.mA)()
              , {phosphorHubCheckout: k} = (0,
            eg.g)()
              , {mutate: w, isPending: C} = es({
                onSuccess: ()=>{
                    null == r || r()
                }
                ,
                onError: e=>{
                    null == o || o({
                        shortMessage: "Invalid email or claim."
                    })
                }
            })
              , {mutate: I, isPending: Z} = ed({
                onSuccess: ()=>{
                    null == r || r()
                }
                ,
                onError: e=>{
                    null == o || o({
                        shortMessage: "Invalid or expired PIN."
                    })
                }
            });
            if (!s || (null == j ? void 0 : j.id) !== (null == y ? void 0 : y.networkId) || !E)
                return (0,
                c.jsxs)(v.Z, {
                    spacing: 2,
                    children: [(0,
                    c.jsx)(g.Z, {
                        text: "Connect Wallet",
                        networkId: null == y ? void 0 : y.networkId
                    }), (0,
                    c.jsx)(p.Z, {
                        variant: "contained",
                        fullWidth: !0,
                        size: "large",
                        color: "secondary",
                        disabled: !0,
                        children: "Claim Now"
                    })]
                });
            if ("success" === _) {
                var S;
                return (0,
                c.jsxs)(v.Z, {
                    spacing: 2,
                    children: [(0,
                    c.jsx)(m.Z, {
                        variant: "body2",
                        children: (0,
                        K.NR)(null !== (S = null == n ? void 0 : n.displayName) && void 0 !== S ? S : "")
                    }), (0,
                    c.jsx)(et, {
                        item: y,
                        creatorProfile: n
                    }), (0,
                    c.jsx)(p.Z, {
                        variant: "outlined",
                        size: "large",
                        fullWidth: !0,
                        onClick: null != l ? l : i,
                        children: "Dismiss"
                    }), k && (0,
                    c.jsx)(ey, {
                        sx: {
                            fontSize: 14
                        }
                    })]
                })
            }
            return h === a.NO_CHECK ? (0,
            c.jsxs)(v.Z, {
                spacing: 2,
                children: [(0,
                c.jsx)(g.Z, {
                    text: "Connect Wallet",
                    networkId: null == y ? void 0 : y.networkId
                }), (0,
                c.jsx)(P.Z, {
                    variant: "contained",
                    fullWidth: !0,
                    size: "large",
                    color: "secondary",
                    loading: C,
                    onClick: ()=>w({
                        claimToken: s,
                        toAddress: E
                    }),
                    children: "Claim your Airdrop"
                }), "error" === _ && (0,
                c.jsx)(f.Z, {
                    severity: "error",
                    children: b
                })]
            }) : h === a.CHECK_EMAIL ? (0,
            c.jsxs)(v.Z, {
                spacing: 2,
                children: [(0,
                c.jsx)(g.Z, {
                    text: "Connect Wallet",
                    networkId: null == y ? void 0 : y.networkId
                }), (0,
                c.jsx)(er, {
                    redeemDropClaim: w,
                    claimToken: s,
                    address: E,
                    redeemDropClaimLoading: C
                }), "error" === _ && (0,
                c.jsx)(f.Z, {
                    severity: "error",
                    children: b
                })]
            }) : (0,
            c.jsxs)(v.Z, {
                spacing: 2,
                children: [(0,
                c.jsx)(g.Z, {
                    text: "Connect Wallet",
                    networkId: null == y ? void 0 : y.networkId
                }), (0,
                c.jsx)(ev, {
                    claimToken: s,
                    address: E,
                    redeemCoreClaim: I,
                    redeemCoreClaimLoading: Z
                }), "error" === _ && (0,
                c.jsx)(f.Z, {
                    severity: "error",
                    children: b
                })]
            })
        }
    },
    55992: function(e, n, t) {
        "use strict";
        t.r(n),
        t.d(n, {
            ItemAttributesAccordian: function() {
                return b
            }
        });
        var i = t(19506)
          , r = t(21278)
          , o = t(74611)
          , l = t(85842)
          , a = t(52833)
          , s = t(68228)
          , c = t(47278)
          , u = t(92781)
          , d = t(24162)
          , h = t(4305);
        function v(e) {
            let {value: n} = e;
            return (0,
            i.jsx)(h.Z, {
                label: n,
                variant: "outlined",
                color: "primary"
            })
        }
        var p = t(4047)
          , m = t(27796)
          , f = t(3432)
          , g = t(74872)
          , x = t(98777)
          , y = t(67016)
          , _ = e=>{
            let {name: n, value: t} = e;
            return (0,
            i.jsxs)(r.Z, {
                direction: "row",
                spacing: 1,
                children: [(0,
                i.jsx)(o.Z, {
                    fontSize: 12,
                    fontWeight: 500,
                    color: "grey.600",
                    children: n
                }), (0,
                i.jsx)(y.Z, {
                    sx: {
                        fontSize: 12,
                        fontWeight: 500
                    },
                    children: t
                })]
            })
        }
        ;
        let b = e=>{
            var n;
            let {name: t, description: h, attributes: y, org: b, orgId: j, profile: E, showMetadata: k, disabled: w, networkId: C, tokenType: I, tokenId: Z, contractAddress: S, soulbound: A} = e;
            return (0,
            i.jsxs)(r.Z, {
                spacing: 1,
                children: [(0,
                i.jsx)(o.Z, {
                    variant: "h4",
                    children: (0,
                    m.Sy)(t, g.ac)
                }), (0,
                i.jsxs)(r.Z, {
                    direction: "row",
                    spacing: 1,
                    children: [(0,
                    i.jsx)(o.Z, {
                        variant: "body1",
                        whiteSpace: "nowrap",
                        children: "Created by"
                    }), (0,
                    i.jsx)(f.default, {
                        org: b,
                        orgId: j,
                        profile: E
                    })]
                }), (0,
                i.jsx)(o.Z, {
                    variant: "body2",
                    sx: {
                        my: "24px !important"
                    },
                    children: h
                }), k && (0,
                i.jsxs)(l.Z, {
                    disabled: w,
                    children: [(0,
                    i.jsx)(a.Z, {
                        expandIcon: (0,
                        i.jsx)(c.Z, {}),
                        id: "metadata",
                        children: (0,
                        i.jsxs)(r.Z, {
                            spacing: 1,
                            direction: "row",
                            display: "flex",
                            alignItems: "center",
                            children: [(0,
                            i.jsx)(u.Z, {}), (0,
                            i.jsx)(o.Z, {
                                variant: "h6",
                                children: "Metadata"
                            })]
                        })
                    }), (0,
                    i.jsx)(s.Z, {
                        children: (0,
                        i.jsx)(p.Z, {
                            container: !0,
                            spacing: 1,
                            sx: {
                                width: "100%"
                            },
                            children: y.length ? y.map(e=>(0,
                            i.jsx)(p.Z, {
                                children: (0,
                                i.jsx)(v, {
                                    value: "".concat(e.name, ": ").concat(e.value)
                                })
                            }, e.name)) : (0,
                            i.jsx)(o.Z, {
                                variant: "body2",
                                color: "grey.700",
                                children: "This item does not have any attributes."
                            })
                        })
                    })]
                }), (0,
                i.jsxs)(l.Z, {
                    children: [(0,
                    i.jsx)(a.Z, {
                        expandIcon: (0,
                        i.jsx)(c.Z, {}),
                        id: "details",
                        children: (0,
                        i.jsxs)(r.Z, {
                            spacing: 1,
                            direction: "row",
                            display: "flex",
                            alignItems: "center",
                            children: [(0,
                            i.jsx)(d.Z, {}), (0,
                            i.jsx)(o.Z, {
                                variant: "h6",
                                children: "Details"
                            })]
                        })
                    }), (0,
                    i.jsxs)(s.Z, {
                        children: [C ? (0,
                        i.jsx)(_, {
                            name: "Network",
                            value: null === (n = g.g5.find(e=>e.chainId === C)) || void 0 === n ? void 0 : n.name
                        }) : null, I && (0,
                        i.jsx)(_, {
                            name: "Token Type",
                            value: g.iv[I]
                        }), Z && (0,
                        i.jsx)(_, {
                            name: "Token ID",
                            value: Z
                        }), S && C && (0,
                        i.jsx)(_, {
                            name: "Contract Address",
                            value: (0,
                            i.jsx)(x.Z, {
                                value: S,
                                networkId: C,
                                showCopyIcon: !0,
                                showExplorerIcon: !0,
                                explorerIconPosition: "end",
                                type: "address",
                                fontSize: 12
                            })
                        }), A && (0,
                        i.jsx)(_, {
                            name: "Non-Transferable",
                            value: "True"
                        })]
                    })]
                })]
            })
        }
    },
    92711: function(e, n, t) {
        "use strict";
        t.r(n),
        t.d(n, {
            default: function() {
                return d
            }
        });
        var i = t(19506)
          , r = t(27796)
          , o = t(67016);
        function l(e) {
            let {videoSrc: n, imageSrc: t} = e;
            return (0,
            i.jsxs)("video", {
                style: {
                    height: "100%",
                    width: "100%",
                    objectFit: "cover"
                },
                poster: t,
                controls: !0,
                autoPlay: !0,
                muted: !0,
                loop: !0,
                children: [(n.toLowerCase().endsWith(".mp4") || n.toLowerCase().endsWith(".m4v")) && (0,
                i.jsx)("source", {
                    src: n,
                    type: "video/mp4"
                }), n.toLowerCase().endsWith(".mov") && (0,
                i.jsx)("source", {
                    src: n,
                    type: "video/quicktime"
                }), n.toLowerCase().endsWith(".ogg") && (0,
                i.jsx)("source", {
                    src: n,
                    type: "video/ogg"
                }), n.toLowerCase().endsWith(".webm") && (0,
                i.jsx)("source", {
                    src: n,
                    type: "video/webm"
                }), "Your browser does not support the video tag."]
            }, n)
        }
        var a = t(42590)
          , s = t(13507)
          , c = t(4360)
          , u = t(74872);
        function d(e) {
            let {mainSrc: n, coverSrc: t} = e;
            return (0,
            i.jsxs)(o.Z, {
                sx: {
                    border: "6px solid white",
                    borderRadius: 4,
                    aspectRatio: 1,
                    width: {
                        xs: "100%",
                        md: 450
                    },
                    backgroundColor: u.wU,
                    overflow: "hidden",
                    position: "relative"
                },
                children: [n && (0,
                r.Or)(n) && (0,
                i.jsx)(s.default, {
                    src: n,
                    alt: n,
                    fill: !0,
                    sizes: "(min-width: 900px) 50vw, 100vw",
                    style: {
                        objectFit: "cover"
                    },
                    loader: (0,
                    c.XI)("full")
                }), n && (0,
                r.Wv)(n) && (0,
                i.jsx)(l, {
                    videoSrc: n,
                    imageSrc: t
                })]
            })
        }
        (0,
        a.j)("ItemDisplay")
    },
    59607: function(e, n, t) {
        "use strict";
        t.d(n, {
            Zs: function() {
                return r
            },
            vA: function() {
                return o
            }
        });
        let i = {
            neutral_50: "#FEFCFF",
            neutral_100: "#FCF9FF",
            neutral_200: "#F9F4FF",
            neutral_300: "#E8E5EC",
            neutral_400: "#D5D1DA",
            neutral_500: "#BCB5C2",
            neutral_600: "#A29BAA",
            neutral_700: "#6A656F",
            neutral_800: "#4F4C54",
            neutral_900: "#222024",
            primary_50: "#E0FEFF",
            primary_100: "#DFFDFF",
            primary_200: "#C0FBFF",
            primary_300: "#A0F8FF",
            primary_500: "#61F4FF",
            primary_600: "#57DFE8",
            primary_700: "#3A9299",
            primary_800: "#276266",
            primary_900: "#133133",
            secondary_50: "#F3EEFC",
            secondary_100: "#E7DDFA",
            secondary_200: "#CFBBF4",
            secondary_300: "#B79AEF",
            secondary_400: "#9F78E9",
            secondary_500: "#8756E4",
            secondary_600: "#6C45B6",
            secondary_700: "#513489",
            secondary_800: "#36225B",
            secondary_900: "#110A1D",
            success_50: "#F0FDF4",
            success_100: "#DCFCE7",
            success_200: "#BBF7D0",
            success_300: "#86EFAC",
            success_400: "#4ADE80",
            success_500: "#22C55E",
            success_600: "#16A34A",
            success_700: "#15803D",
            success_800: "#166534",
            success_900: "#14532D",
            warning_50: "#FFFBEB",
            warning_100: "#FEF3C7",
            warning_200: "#FDE68A",
            warning_300: "#FCD34D",
            warning_400: "#FBBF24",
            warning_500: "#F59E0B",
            warning_600: "#D97706",
            warning_700: "#B45309",
            warning_800: "#92400E",
            warning_900: "#78350F",
            destructive_50: "#FEF2F2",
            destructive_100: "#FEE2E2",
            destructive_200: "#FECACA",
            destructive_300: "#FCA5A5",
            destructive_400: "#F87171",
            destructive_500: "#EF4444",
            destructive_600: "#DC2626",
            destructive_700: "#B91C1C",
            destructive_800: "#991B1B",
            destructive_900: "#7F1D1D",
            charts: {
                blue: "#4E97FD",
                green: "#CBFFA1",
                orange: "#F5AF6D",
                pink: "#FF5BEF",
                purple: "#AC25FF",
                electricBlue: "#5BF5FF",
                electricGreen: "#0BE47C",
                electricOrange: "#FF8718",
                red: "#F2420C",
                yellow: "#FFF734"
            },
            shades: {
                white: "#fff",
                white_70: "rgba(255, 255, 255, 0.7)",
                white_50: "rgba(255, 255, 255, 0.5)",
                white_30: "rgba(255, 255, 255, 0.3)",
                white_20: "rgba(255, 255, 255, 0.2)",
                white_10: "rgba(255, 255, 255, 0.1)",
                black_10: "rgba(0, 0, 0, 0.1)",
                black_20: "rgba(0, 0, 0, 0.2)",
                black_30: "rgba(0, 0, 0, 0.3)",
                black_50: "rgba(0, 0, 0, 0.5)",
                black_70: "rgba(0, 0, 0, 0.7)",
                black: "#000"
            }
        };
        n.ZP = i;
        let r = {
            grey: {
                50: i.shades.white_50,
                400: i.shades.white_20,
                500: i.shades.white_10,
                600: i.neutral_600,
                700: i.shades.black_30,
                800: i.shades.black_50,
                900: i.shades.black_70
            },
            text: {
                primary: i.neutral_900
            },
            primary: {
                main: i.secondary_500,
                light: i.neutral_100,
                dark: i.secondary_900
            },
            secondary: {
                light: i.primary_100,
                main: i.primary_500,
                dark: i.primary_900
            },
            background: {
                paper: i.secondary_900
            },
            error: {
                main: i.destructive_500
            },
            warning: {
                main: i.warning_500
            },
            info: {
                main: i.secondary_500
            },
            success: {
                main: i.success_500
            },
            action: {
                disabled: i.shades.black_20
            },
            ...i
        }
          , o = {}
    },
    74872: function(e, n, t) {
        "use strict";
        t.d(n, {
            A8: function() {
                return m
            },
            Ac: function() {
                return p
            },
            C8: function() {
                return Z
            },
            H0: function() {
                return k
            },
            H3: function() {
                return E
            },
            HH: function() {
                return a
            },
            IV: function() {
                return u
            },
            LA: function() {
                return y
            },
            NJ: function() {
                return d
            },
            PU: function() {
                return I
            },
            U2: function() {
                return x
            },
            ac: function() {
                return v
            },
            cC: function() {
                return _
            },
            cY: function() {
                return r
            },
            cu: function() {
                return o
            },
            dF: function() {
                return g
            },
            et: function() {
                return l
            },
            g5: function() {
                return c
            },
            i4: function() {
                return f
            },
            iv: function() {
                return b
            },
            qO: function() {
                return h
            },
            t5: function() {
                return w
            },
            v9: function() {
                return C
            },
            wU: function() {
                return s
            },
            xE: function() {
                return j
            }
        });
        var i = t(59607);
        let r = "consumer-app"
          , o = {
            cacheTime: 6e6,
            staleTime: 18e5
        }
          , l = [["#c200fb", "#ec0868", "#fc2f00"], ["#F87171", "#e6b89c", "#cdeac0"], ["#FCA5A5", "#c5dedd", "#276266"], ["#276266", "#bdb2ff", "#fdffb6"], ["#FEF3C7", "#caffbf", "#61F4FF"], ["#1e3f1f", "#474c28", "#7F1D1D"], ["#6d3b47", "#453a49", "#133133"], ["#2d0065", "#7a007a", "#600028"], ["#0b525b", "#1b3a4b", "#4d194d"], [i.ZP.primary_900, i.ZP.secondary_900, i.ZP.secondary_800]]
          , a = "linear-gradient(150deg, rgba(131,58,180,1) 0%, rgba(58,34,91,1) 20%, ".concat(i.ZP.secondary_900, " 65%, rgba(58,34,91,1) 100%)")
          , s = "linear-gradient(150deg, ".concat(i.ZP.neutral_100, " 0%, ").concat(i.ZP.neutral_300, " 65%, ").concat(i.ZP.neutral_200, " 100%)")
          , c = [{
            name: "Ethereum",
            chainId: 1,
            id: 1,
            testnet: !1,
            enum: "ETHEREUM"
        }, {
            name: "Polygon",
            chainId: 137,
            id: 137,
            testnet: !1,
            enum: "POLYGON"
        }, {
            name: "Goerli Testnet",
            chainId: 5,
            id: 5,
            testnet: !0,
            enum: "GOERLI"
        }, {
            name: "Sepolia Testnet",
            chainId: 11155111,
            id: 11155111,
            testnet: !0,
            enum: "SEPOLIA"
        }, {
            name: "Polygon Mumbai Testnet",
            chainId: 80001,
            id: 80001,
            testnet: !0,
            enum: "MUMBAI"
        }, {
            name: "Linea Testnet",
            chainId: 59140,
            id: 59140,
            testnet: !0,
            enum: "LINEA_TESTNET"
        }, {
            name: "Linea",
            chainId: 59144,
            id: 59144,
            testnet: !1,
            enum: "LINEA"
        }, {
            name: "Palm Testnet",
            chainId: 11297108099,
            id: 11297108099,
            testnet: !0,
            enum: "PALM_TESTNET"
        }, {
            name: "Palm",
            chainId: 11297108109,
            id: 11297108109,
            testnet: !1,
            enum: "PALM"
        }]
          , u = 6
          , d = 100
          , h = 1e3
          , v = 32
          , p = 140
          , m = "Anonymous"
          , f = "2MB"
          , g = "preventCancel"
          , x = "preventSubmit"
          , y = 25e4
          , _ = 5e4
          , b = {
            ERC1155: "ERC-1155",
            ERC721: "ERC-721"
        }
          , j = "It looks like you have reached the purchase limit for this mint."
          , E = "It looks like you are not on the allowlist for this drop."
          , k = "An issue occurred while preparing your transaction."
          , w = k + " Please try again shortly."
          , C = "Transaction was reverted. This could be because the network is busy or the transaction was cancelled. Please try again shortly."
          , I = "Failed to upload file. Please try again shortly."
          , Z = "Something went wrong. Please try again shortly."
    },
    16503: function(e, n, t) {
        "use strict";
        t.d(n, {
            z: function() {
                return u
            },
            X: function() {
                return h
            }
        });
        var i = t(29530)
          , r = t(61131)
          , o = t(46885)
          , l = t(42590)
          , a = t(55307);
        let s = (0,
        l.j)("LaunchDarklyFeatureFlags")
          , c = {
            kind: "user",
            key: "user"
        }
          , u = (0,
        r.sj)({
            flags: {},
            context: {}
        });
        function d(e) {
            for (let[n,t] of (s.debug("onFlagsChange", e),
            Object.entries(e)))
                u.flags[n] = t.current
        }
        async function h(e) {
            if (s.debug("initialize LaunchDarklyFeatureFlags"),
            !e) {
                s.debug("No FEATURE_FLAGS_CLIENT_ID provided. Skipping LaunchDarkly initialization.");
                return
            }
            u.context = c;
            try {
                let e = (0,
                i.j2)(a.HM, c);
                await e.waitUntilReady(),
                u.flags = e.allFlags(),
                e.on("change", d),
                u.ldClient = e
            } catch (e) {
                s.error("error", e);
                return
            }
        }
        (0,
        o.VW)(u, "flags", ()=>{
            s.debug("state", (0,
            r.CO)(u.flags))
        }
        )
    },
    27796: function(e, n, t) {
        "use strict";
        t.d(n, {
            bu: function() {
                return f
            },
            Tg: function() {
                return p
            },
            u0: function() {
                return y
            },
            Lo: function() {
                return _
            },
            iN: function() {
                return k
            },
            Kt: function() {
                return v
            },
            NR: function() {
                return w
            },
            il: function() {
                return C
            },
            vj: function() {
                return Z
            },
            mK: function() {
                return I
            },
            jY: function() {
                return m
            },
            UI: function() {
                return c
            },
            Or: function() {
                return d
            },
            Wv: function() {
                return u
            },
            mR: function() {
                return b
            },
            UG: function() {
                return j
            },
            Sy: function() {
                return h
            },
            k$: function() {
                return g
            }
        });
        var i = t(74872)
          , r = t(35733)
          , o = t.n(r)
          , l = t(98550)
          , a = t.n(l)
          , s = t(72458);
        function c(e) {
            let n = t(22834)(e);
            return i.et[Math.floor(n.quick() * i.et.length)]
        }
        s.z.string().uuid(),
        s.z.string().transform(e=>new Blob([e]).size).refine(e=>43 === e),
        t(27252),
        o().extend(a());
        let u = e=>!!e && /\.(mp4|mov|m4v|webm|ogg)$/i.test(e)
          , d = e=>!!e && (/\.(png|jpg|jpeg|svg|gif|webp)(&size=(full|original|thumb|tiny))?$/i.test(e) || /^https:\/\/\w+\.googleusercontent.com.*/i.test(e) || e.startsWith("https://platform-lookaside.fbsbx.com"))
          , h = function(e) {
            let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.ac
              , t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "end"
              , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 4
              , o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 4;
            if (!e || e.length <= n)
                return e;
            switch (t) {
            case "end":
                return "".concat(e.slice(0, n), "...");
            case "middle":
                return "".concat(e.slice(0, r), "...").concat(e.slice(0 - o));
            case "start":
                return "...".concat(e.slice(0 - n));
            default:
                return e.slice(0, n) + "..."
            }
        }
          , v = e=>{
            let n = e.toLowerCase();
            return (n.startsWith("http") || n.startsWith("www")) && (n = n.split(".").slice(1).join(".")),
            h(n = n.replace(/\/.*/, ""), 12)
        }
          , p = function(e) {
            let n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
              , t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 4
              , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 4;
            return n ? "".concat(e.slice(0, t), " \xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7 ").concat(e.slice(0 - i)) : "".concat(e.slice(0, t), " \xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7 \xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7 \xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7 \xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7 ").concat(e.slice(0 - i))
        };
        function m(e, n) {
            let t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "address"
              , i = "";
            if (e && n)
                switch (e) {
                case 1:
                    i = "https://etherscan.io/".concat(t, "/").concat(n);
                    break;
                case 5:
                    i = "https://goerli.etherscan.io/".concat(t, "/").concat(n);
                    break;
                case 137:
                    i = "https://polygonscan.com/".concat(t, "/").concat(n);
                    break;
                case 80001:
                    i = "https://mumbai.polygonscan.com/".concat(t, "/").concat(n);
                    break;
                case 11155111:
                    i = "https://sepolia.etherscan.io/".concat(t, "/").concat(n);
                    break;
                case 59140:
                    i = "https://goerli.lineascan.build/".concat(t, "/").concat(n);
                    break;
                case 59144:
                    i = "https://lineascan.build/".concat(t, "/").concat(n);
                    break;
                case 11297108099:
                    switch (t) {
                    case "address":
                        i = "https://testnet.palm.chainlens.com/contracts/".concat(n);
                        break;
                    case "tx":
                        i = "https://testnet.palm.chainlens.com/transactions/".concat(n)
                    }
                    break;
                case 11297108109:
                    switch (t) {
                    case "address":
                        i = "https://www.ondora.xyz/network/palm/accounts/".concat(n);
                        break;
                    case "tx":
                        i = "https://www.ondora.xyz/network/palm/interactions/".concat(n)
                    }
                }
            return i
        }
        function f(e) {
            return BigInt(e) * BigInt(11) / BigInt(10)
        }
        let g = ()=>{
            let e = new Date().getTime()
              , n = "undefined" != typeof performance && performance.now && 1e3 * performance.now() || 0;
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                let i = 16 * Math.random();
                return e > 0 ? (i = (e + i) % 16 | 0,
                e = Math.floor(e / 16)) : (i = (n + i) % 16 | 0,
                n = Math.floor(n / 16)),
                ("x" === t ? i : 3 & i | 8).toString(16)
            })
        }
        ;
        function x(e, n) {
            return e && o()(e).isValid() ? o()(e).format(n) : ""
        }
        function y(e) {
            let n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return n ? x(e, "ll") : x(e, "LL")
        }
        function _(e) {
            let n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return n ? x(e, "lll") : x(e, "LLL")
        }
        function b(e) {
            return o()().isAfter(null == e ? void 0 : e.endTime)
        }
        function j(e) {
            return (null == e ? void 0 : e.quantityRemaining) === 0
        }
        function E(e) {
            return e && "shortMessage"in e && e.shortMessage || ""
        }
        function k(e) {
            let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return "string" == typeof e ? e : n ? "".concat(n, " ").concat(E(e)) : E(e)
        }
        let w = e=>e ? "Congratulations! You've added a new collectible from ".concat(h(e, i.ac), " to your collection.") : "Congratulations! You've added a new collectible to your collection."
          , C = e=>{
            let {startsAt: n, endsAt: t} = e
              , i = !!n && o()().isBefore(n)
              , r = !!t && o()().isAfter(t)
              , l = !r && !i && !!n && o()().isAfter(n);
            if (l || i || r)
                return l ? "active" : i ? "upcoming" : void 0
        }
          , I = e=>{
            var n;
            let t = null == e ? void 0 : e[0];
            if (t)
                return e.length > 1 && (t = e.sort((e,n)=>{
                    var t, i;
                    return o()(null === (t = e.mint) || void 0 === t ? void 0 : t.opensAt).diff(o()(null === (i = n.mint) || void 0 === i ? void 0 : i.opensAt))
                }
                )[0]),
                null === (n = t.mint) || void 0 === n ? void 0 : n.opensAt
        }
          , Z = e=>{
            var n;
            let t = null == e ? void 0 : e[0];
            if (t)
                return e.length > 1 && (t = e.sort((e,n)=>{
                    var t, i;
                    return o()(null === (t = e.mint) || void 0 === t ? void 0 : t.closesAt).diff(o()(null === (i = n.mint) || void 0 === i ? void 0 : i.closesAt))
                }
                )[0]),
                null === (n = t.mint) || void 0 === n ? void 0 : n.closesAt
        }
    },
    44319: function(e, n, t) {
        "use strict";
        t.d(n, {
            g: function() {
                return o
            }
        });
        var i = t(16503)
          , r = t(87455);
        let o = ()=>{
            let {flags: e} = (0,
            r.R)(i.z)
              , n = function(n) {
                var t;
                let i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return null !== (t = e[["consumer-app", n.replace("@", "-")].filter(Boolean).join(".")]) && void 0 !== t ? t : i
            };
            return {
                testFlagExample: n("test-flag"),
                login: n("login"),
                loginWithWallet: n("login-with-wallet"),
                collectorProfile: n("collector-profile"),
                resetCollectorProfile: n("reset-collector-profile"),
                phosphorHubCheckout: n("phosphor-hub.checkout"),
                connectWalletTopBar: n("connect-wallet.topbar"),
                checkoutModalClickaway: n("checkout-modal.clickaway")
            }
        }
    },
    42590: function(e, n, t) {
        "use strict";
        let i;
        t.d(n, {
            j: function() {
                return v
            }
        });
        var r = t(40828)
          , o = t.n(r);
        t(8965);
        var l = t(74872)
          , a = t(29440)
          , s = t.n(a);
        let c = ["password", "authorization", "accessToken", "apiKey", "authToken", "user.password", "user.authorization", "user.accessToken", "token.accessToken", "token.apiKey", "token.authToken", "session.accessToken", "session.apiKey", "session.authToken", "session.user.password", "session.user.authorization", "session.user.accessToken", "session.token.accessToken", "session.token.apiKey", "session.token.authToken"];
        s()({
            paths: c
        }),
        o()(l.cY);
        var u = t(68782)
          , d = t.n(u);
        class h {
            static get root() {
                return i || (i = d()({
                    name: l.cY,
                    level: "info",
                    redact: c
                })),
                i
            }
            child(e) {
                return new h(this.logger.child("string" == typeof e ? {
                    context: e
                } : e))
            }
            info(e, n) {
                this.logger.info({
                    msg: e,
                    ...null != n ? n : {}
                }, e)
            }
            debug(e, n) {
                this.logger.debug({
                    msg: e,
                    ...null != n ? n : {}
                }, e)
            }
            warn(e, n) {
                this.logger.warn({
                    msg: e,
                    ...null != n ? n : {}
                }, e)
            }
            error(e, n) {
                this.logger.error({
                    msg: e,
                    ...null != n ? n : {}
                }, e)
            }
            constructor(e, n) {
                this.logger = n ? e.child({
                    context: n
                }) : e
            }
        }
        function v(e) {
            return new h(h.root,e)
        }
    },
    35716: function(e, n, t) {
        "use strict";
        t.d(n, {
            S: function() {
                return i
            }
        });
        let i = (0,
        t(61131).sj)({
            checkoutModalProps: void 0
        })
    }
}]);
