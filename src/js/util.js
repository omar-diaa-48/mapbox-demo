export const findNearestBranch = (latlng, branchPolygons) => {
  const nearBranches = branchPolygons.filter(({polygon}) => polygon.getBounds().contains(latlng))
  const resultBtn = document.getElementById('result')
  if(nearBranches && nearBranches.length !== 0){
    nearBranches.forEach(branch => resultBtn.innerHTML = `${branch.name} branch is happy to deliver to you!`)
    resultBtn.disabled = false;
    return nearBranches;
  }else{
    document.querySelector('#result').innerHTML = `We can't deliver here`
    resultBtn.disabled = true;
  }
}