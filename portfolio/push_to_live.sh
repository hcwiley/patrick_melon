ssh wd40too@wd40too.com <<'ENDSSH'
cd /home/wd40too/hg/art-sites/art-decode72/ 
hg pull
hg up
cp -r portfolio/* /home/wd40too/webapps/artist_sites/portfolio/
cp -r public/* /home/wd40too/webapps/artist_sites_static/
cd /home/wd40too/webapps/artist_sites/apache2/bin
./restart
exit
ENDSSH
