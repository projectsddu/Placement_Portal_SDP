# ls
# VERSION=`ls -td -- */ | head -n 1 | cut -d'/' -f1`
# echo $VERSION
# VERSION="${VERSION:1:2}"
# VERSION="$((VERSION+1))"
# echo $VERSION
# mkdir "V"${VERSION}
# read ip

cd ..
while true;
do
RES=`git status`;
echo $RES;
sleep 1;
done