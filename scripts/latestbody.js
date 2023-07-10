import updatelog from "./updatelog.mjs";
if(process.argv[2]){
  return updatelog(process.argv[2])
}else{
  return 'See the assets to download this version and install.'
}