#ssh hcwiley@hcwiley.com
cp -r /home/wd40too/webapps/artist_sites/portfolio/ /home/hcwiley/hg/artist-sites/art-decode72/portfolio/
cp -r /home/wd40too/webapps/artist_sites_static/* /home/hcwiley/hg/artist-sites/art-decode72/public/
cd  /home/hcwiley/hg/artist-sites/
hg ci -m 'commit from live'
hg push

