- 更新 homepbrew
<pre>
brew update
</pre>
 如果长时间操作没有任何动静，可以更换镜像，参考[清华的镜像](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)
 <br/>

- 查看 nginx 是否已安装过，如果已安装，请跳过下一步

- 按照Nginx
<pre>
brew install nginx
</pre>
按照成功后，对应的主页文件在`/usr/local/var/www `<br/>
对应的配置文件在 `/usr/local/etc/nginx/nginx.conf`<br/>

- 修改配置文件`例如：本地静态文件代理`
 具体可以参考[nginx配置本地静态服务器Mac](https://blog.csdn.net/lr123838/article/details/78431962)

 - Nginx 常用指令
<pre>
nginx #启动Nginx
nginx -s quit #快速关闭Nginx
nginx -V #查看版本，以及配置文件地址
nginx -v #查看版本
nginx -s resload|reopen|stop|quit #重新加载匹配|重启|快速停止|关闭Nginx
nginx -h  #帮助
</pre>
 <pre>
  nginx -h #帮助
        nginx version: nginx/1.17.1
        Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

        Options:
        -?,-h         : this help
        -v            : show version and exit
        -V            : show version and configure options then exit
        -t            : test configuration and exit
        -T            : test configuration, dump it and exit
        -q            : suppress non-error messages during configuration testing
        -s signal     : send signal to a master process: stop, quit, reopen, reload
        -p prefix     : set prefix path (default: /usr/local/Cellar/nginx/1.17.1/)
        -c filename   : set configuration file (default: /usr/local/etc/nginx/nginx.conf)
        -g directives : set global directives out of configuration file
 </pre>