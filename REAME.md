# プロジェクト名

## ファイル構造

### バックエンド(backend_django)

```
backend_django
├── backend_django      プロジェクトディレクトリ
│   ├── __pycache__     キャッシュ
│   ├── __init__.py
│   ├── asgi.py         プロジェクトを提供するASGI互換のWebサーバーのエントリポイント
│   ├── settings.py     Djangoプロジェクトの設定ファイル
│   ├── urls.py         Djangoプロジェクト全体のURLの定義(エンドポイント定義)
│   └── wsgi.py         プロジェクトをサーブするためのWSGI互換のWebサーバーとのエントリーポイント
├── django_app          アプリディレクトリ
│   ├── __pycache__     キャッシュ
│   ├── migrations
│   │   ├── __pycache__
│   │   ├── __init__.py
│   │   ├── 0001_initial.py
│   │   ├── 0002_alter_projecttopics_options_and_more.py
│   │   ├── 0003_projecttopics_created_at_projecttopics_updated_at.py
│   │   ├── 0004_alter_projecttopics_created_at.py
│   │   ├── 0005_activitytopics_portfoliotopics.py
│   │   ├── 0006_rename_topic_id_activitytopics_id_and_more.py
│   │   ├── 0007_topcscategory_activitytopics_category_and_more.py
│   │   ├── 0008_rename_topcscategory_topicscategory.py
│   │   ├── 0009_mypageuserprofile_alter_activitytopics_options_and_more.py
│   │   ├── 0010_pricingplan_alter_topicscategory_options.py
│   │   ├── 0011_alter_mypageuserprofile_member_type.py
│   │   ├── 0012_mypageuserprofile_phone.py
│   │   ├── 0013_alter_mypageuserprofile_phone.py
│   │   ├── 0014_tipscategory.py
│   │   ├── 0015_tipscontents.py
│   │   ├── 0016_alter_tipscontents_content.py
│   │   ├── 0017_tipscategory_tips_path_alter_tipscontents_category.py
│   │   ├── 0018_alter_tipscontents_category.py
│   │   ├── 0019_mypageuserprofile_groups_and_more.py
│   │   ├── 0020_remove_mypageuserprofile_groups_and_more.py
│   │   ├── 0021_customuser.py
│   │   └── 0022_delete_customuser.py
│   ├── __init__.py
│   ├── admin.py        Django管理画面でアプリケーションのモデルを管理するための設定ファイル
│   ├── apps.py         このアプリケーションの設定ファイル
│   ├── models.py       アプリケーションで使用するモデル(データベースのテーブルと関連するフィールド)を定義
│   ├── serializers.py  データの加工や、形式の正誤（バリデーション）をチェック
│   ├── tests.py        モデル(models.py)やビュー(views.py)の動作を検証するためのテストコードを記述
│   ├── urls.py
│   └── views.py        URLと処理を関連付けるビューを定義
├── .gitignore
├── db.sqlite3
├── Dockerfile
├── main.py
├── manage.py           Djangoの管理用コマンドを実行
└── requirements.txt
```

### フロントエンド(frontend_react)

```
frontend_react
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── components                  コンポーネント定義
│   │   ├── BaseHeader.js
│   │   ├── BaseSideMenu.js
│   │   └── DashBoardCarousel.js
│   ├── data                        テスト用データ
│   │   ├── activity.json
│   │   ├── portforio.json
│   │   └── project.json
│   ├── features                    機能の定義（ログインなど）
│   │   ├── account
│   │   │   └── authSlice.js
│   │   ├── mypage
│   │   │   ├── mypageProfileSlice.js
│   │   │   └── mypageSlice.js
│   │   ├── tips
│   │   │   ├── tipsCategorizeSlice.js
│   │   │   ├── tipsCategoryListSlice.js
│   │   │   ├── tipsDetailSlice.js
│   │   │   ├── tipsEditSlice.js
│   │   │   └── tipsSlice.js
│   │   └── topics
│   │       ├── activityTopicsSlice.js
│   │       ├── portfolioTopicsSlice.js
│   │       └── projectTopicsSlice.js
│   ├── pages                       ページ画面の定義
│   │   ├── mypage
│   │   │   ├── EditProfile.js
│   │   │   └── MypageIndex.js
│   │   ├── tips
│   │   │   ├── TipsCategorize.js
│   │   │   ├── TipsCreate.js
│   │   │   ├── TipsDetail.js
│   │   │   ├── TipsEdit.js
│   │   │   └── TipsIndex.js
│   │   ├── DashBoard.js
│   │   ├── Layout.js
│   │   └── Login.js
│   ├── store
│   │   └── index.js
│   ├── utils
│   │   └── ColorUtils.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── BaseApp.css
│   ├── BaseApp.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
```

## ER図

以下にER図を示します。

![ER図](path/to/er-diagram.png)

## Dockerのセットアップと立ち上げ方法

### 前提条件

- Dockerがインストールされていること
- Docker Composeがインストールされていること

### セットアップ

1. プロジェクトのルートディレクトリに移動します。

```bash
cd /path/to/project-root
```

2. Docker Composeを使用してコンテナをビルドし、起動します。

```bash
docker compose up --build
```


### コンテナの停止

```bash
docker compose down
```

※バージョンの関係上で `docker-compose` が使えないため、 `docker compose` としてください。


## フロントエンドとバックエンドのlocalhostとログイン方法

### フロントエンド
フロントエンドは、以下のURLでアクセスできます。

```
http://localhost:3000
```

### バックエンド
バックエンドは、以下のURLでアクセスできます。

```
http://localhost:8000
```

### ログイン方法

1. フロントエンドのログインページにアクセスします。
2. 登録済みのメールアドレスとパスワードを入力してログインします。

### 簡単なプレビュー

- **ダッシュボード**: ログイン後、ダッシュボードページにアクセスできます。ここでは、参加プロジェクト、ポートフォリオ、活動記録などが表示されます。
- **プロジェクト一覧**: 「詳細を見る」リンクをクリックすると、プロジェクトの詳細一覧ページに移動します。
- **ポートフォリオ一覧**: 「詳細を見る」リンクをクリックすると、ポートフォリオの詳細一覧ページに移動します。
- **活動記録一覧**: 「詳細を見る」リンクをクリックすると、活動記録の詳細一覧ページに移動します。

## その他

- 詳細な設定やカスタマイズについては、各ディレクトリ内のREADMEファイルを参照してください。
- 問題が発生した場合は、issueを作成してください。


## 参考

- [Djangoでのwebアプリの作成[基礎編〜Djangoディレクトリの階層説明〜]](https://qiita.com/JavaLangRuntimeException/items/8787692aaf9b1d943205)