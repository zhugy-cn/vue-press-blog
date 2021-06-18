<template><h2 id="开启通知"><a class="header-anchor" href="#开启通知">#</a> 开启通知</h2>
<p>redis.windows.conf 文件中打开 notify-keyspace-events &quot;Ex&quot; 配置，重启</p>
<p>set name jack ex 30</p>
<p>SUBSCRIBE <strong>keyevent@0</strong>:expired 订阅主题</p>
<h2 id="宝塔面板"><a class="header-anchor" href="#宝塔面板">#</a> 宝塔面板</h2>
<h3 id="redis-操作"><a class="header-anchor" href="#redis-操作">#</a> redis 操作</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token constant">D</span><span class="token operator">:</span>\WorkPlace\BtSoft\redis<span class="token operator">></span>redis<span class="token operator">-</span>cli  #切换到redis安装目录，启动redis客户端命令行
  <span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> auth <span class="token number">123456</span><span class="token function">#试一下改的密码，发现验证失败</span>
  <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token constant">ERR</span> <span class="token constant">AUTH</span> <span class="token operator">&lt;</span>password<span class="token operator">></span> called without any password configured <span class="token keyword">for</span> the <span class="token keyword">default</span> user<span class="token punctuation">.</span>
  Are you sure your configuration is correct<span class="token operator">?</span>
  <span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> config <span class="token keyword">set</span> requirepass <span class="token string">"admin"</span>  #命令行重设密码
  <span class="token constant">OK</span>
  <span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> auth admin #用新密码验证ok
  <span class="token constant">OK</span>
  <span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></template>