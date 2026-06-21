interface HelpPageProps {
  onClose: () => void
}

export function HelpPage({ onClose }: HelpPageProps) {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-primary text-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={onClose}
          className="p-2 rounded hover:bg-white/20 transition-colors"
          aria-label="戻る"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold">ヘルプ</h1>
        <div className="w-10" /> {/* スペーサー */}
      </header>

      <main className="container mx-auto p-4 max-w-2xl">
        <div className="bg-surface rounded-lg p-4 space-y-6">
          {/* 基本的な使い方 */}
          <section>
            <h2 className="text-lg font-bold text-on-surface mb-3 border-b border-border pb-2">
              基本的な使い方
            </h2>
            <ol className="space-y-3 text-on-surface">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                  1
                </span>
                <div>
                  <p className="font-medium">電線管を選択</p>
                  <p className="text-sm text-on-surface-secondary">
                    ドロップダウンから電線管の種類とサイズを選びます
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                  2
                </span>
                <div>
                  <p className="font-medium">電線を追加</p>
                  <p className="text-sm text-on-surface-secondary">
                    「+ 電線を追加」ボタンから、種類・サイズ・本数を指定して追加します
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                  3
                </span>
                <div>
                  <p className="font-medium">占有率を確認</p>
                  <p className="text-sm text-on-surface-secondary">
                    占有率が自動計算され、基準内かどうかが表示されます
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* 占有率の基準 */}
          <section>
            <h2 className="text-lg font-bold text-on-surface mb-3 border-b border-border pb-2">
              占有率の基準
            </h2>
            <div className="space-y-2 text-on-surface">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-success"></span>
                <span className="font-medium">32%以下</span>
                <span className="text-sm text-on-surface-secondary">- 基準内（異サイズ混在時）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-warning"></span>
                <span className="font-medium">48%以下</span>
                <span className="text-sm text-on-surface-secondary">- 基準内（同一サイズのみ）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-danger"></span>
                <span className="font-medium">基準超過</span>
                <span className="text-sm text-on-surface-secondary">- 電線管を大きくするか電線を減らしてください</span>
              </div>
            </div>
          </section>

          {/* 保存と共有 */}
          <section>
            <h2 className="text-lg font-bold text-on-surface mb-3 border-b border-border pb-2">
              保存と共有
            </h2>
            <div className="space-y-3 text-on-surface">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">保存</p>
                  <p className="text-sm text-on-surface-secondary">
                    計算結果をブラウザに保存します。名前を付けて管理できます
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">共有</p>
                  <p className="text-sm text-on-surface-secondary">
                    URLで計算内容を他の人と共有できます
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 保存済みデータ */}
          <section>
            <h2 className="text-lg font-bold text-on-surface mb-3 border-b border-border pb-2">
              保存済みデータ
            </h2>
            <p className="text-on-surface text-sm mb-3">
              画面下部の「保存済み」エリアから、過去の計算を管理できます。
            </p>
            <div className="space-y-3 text-on-surface">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-background flex items-center justify-center text-warning text-xl">
                  ★
                </div>
                <div>
                  <p className="font-medium">お気に入り</p>
                  <p className="text-sm text-on-surface-secondary">
                    星マークをタップでお気に入りに登録・解除。お気に入りはリストの上部に表示されます
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                  読込
                </div>
                <div>
                  <p className="font-medium">読み込み</p>
                  <p className="text-sm text-on-surface-secondary">
                    項目をタップして展開し、「読み込む」で計算を再開できます
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full border border-danger text-danger flex items-center justify-center text-xs font-medium">
                  削除
                </div>
                <div>
                  <p className="font-medium">削除</p>
                  <p className="text-sm text-on-surface-secondary">
                    不要なデータは「削除」ボタンで削除できます
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PWAインストール */}
          <section>
            <h2 className="text-lg font-bold text-on-surface mb-3 border-b border-border pb-2">
              スマホにインストール
            </h2>
            <p className="text-on-surface mb-4">
              このアプリはスマートフォンのホーム画面に追加して、アプリのように使えます。
            </p>

            <div className="space-y-4">
              {/* Chrome の場合 */}
              <div className="bg-background rounded-lg p-3">
                <h3 className="font-medium text-on-surface mb-2">Chrome での追加方法</h3>
                <ol className="text-sm text-on-surface-secondary space-y-1 mb-3">
                  <li>1. Chrome でこのページを開く</li>
                  <li>2. メニュー（︙）を開く</li>
                  <li>3. 「ホーム画面に追加」を選択</li>
                  <li>4. 「インストール」を選択</li>
                </ol>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-on-surface-secondary mb-1">手順3: メニューから「ホーム画面に追加」を選択</p>
                    <img
                      src={`${baseUrl}pics/1000001904.png`}
                      alt="ホーム画面に追加"
                      className="rounded-lg border border-border max-w-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-secondary mb-1">手順4: 「インストール」を選択</p>
                    <img
                      src={`${baseUrl}pics/1000001905.png`}
                      alt="インストール"
                      className="rounded-lg border border-border max-w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Safari の場合 */}
              <div className="bg-background rounded-lg p-3">
                <h3 className="font-medium text-on-surface mb-2">Safari (iPhone) での追加方法</h3>
                <ol className="text-sm text-on-surface-secondary space-y-1">
                  <li>1. Safari でこのページを開く</li>
                  <li>2. 共有ボタン（↑）をタップ</li>
                  <li>3. 「ホーム画面に追加」を選択</li>
                </ol>
              </div>
            </div>
          </section>

          {/* その他 */}
          <section>
            <h2 className="text-lg font-bold text-on-surface mb-3 border-b border-border pb-2">
              その他
            </h2>
            <ul className="text-on-surface space-y-2">
              <li className="flex gap-2">
                <span className="text-on-surface-secondary">•</span>
                <span>保存した計算結果はこの端末でのみ利用できます</span>
              </li>
              <li className="flex gap-2">
                <span className="text-on-surface-secondary">•</span>
                <span>インストール後はオフラインでも使用できます</span>
              </li>
              <li className="flex gap-2">
                <span className="text-on-surface-secondary">•</span>
                <span>カラーテーマはメニューから切り替えできます</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
