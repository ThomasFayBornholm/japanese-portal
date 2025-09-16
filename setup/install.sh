install_path="/var/www/html/japanese"
src_path="/home/glatho01/src/japanese-portal"
cp $src_path/vocab $install_path/
cp $src_path/main.js $install_path/
cp $src_path/fmt.css $install_path/
cp -r $src_path/backend $install_path/
mkdir -p $install_path/lists
mkdir -p $install_path/img
cp $src_path/lists/all-def $install_path/lists
cp $src_path/lists/hiragana $install_path/lists
cp $src_path/img/* $install_path/img/

if [ ! -f $install_path/jquery-3.6.0.js ]; then
    wget -O "$install_path/jquery-3.6.0.js" https://code.jquery.com/jquery-3.6.0.js
fi

if [ ! -d $install_path/jquery-ui-1.14.1 ]; then
    wget -O "$install_path/jquery-ui-1.14.1.zip" https://jqueryui.com/resources/download/jquery-ui-1.14.1.zip
    eval "unzip $install_path/jquery-ui-1.14.1.zip -d $install_path"
fi