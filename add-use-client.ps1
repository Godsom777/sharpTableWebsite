$files = Get-ChildItem 'c:\Users\Starkizz Gadget\FLUTTER\sharpTableWebsite\components\*.tsx'
foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  if ($content -notmatch "^'use client'") {
    $newContent = "'use client';" + "`r`n`r`n" + $content
    Set-Content $file.FullName -Value $newContent -NoNewline
    Write-Output "Added use client to $($file.Name)"
  } else {
    Write-Output "Already has use client: $($file.Name)"
  }
}

# Also handle contexts
$ctxFiles = Get-ChildItem 'c:\Users\Starkizz Gadget\FLUTTER\sharpTableWebsite\contexts\*.tsx'
foreach ($file in $ctxFiles) {
  $content = Get-Content $file.FullName -Raw
  if ($content -notmatch "^'use client'") {
    $newContent = "'use client';" + "`r`n`r`n" + $content
    Set-Content $file.FullName -Value $newContent -NoNewline
    Write-Output "Added use client to $($file.Name)"
  } else {
    Write-Output "Already has use client: $($file.Name)"
  }
}

# Also handle screens
$screenFiles = Get-ChildItem 'c:\Users\Starkizz Gadget\FLUTTER\sharpTableWebsite\screens\*.tsx'
foreach ($file in $screenFiles) {
  $content = Get-Content $file.FullName -Raw
  if ($content -notmatch "^'use client'") {
    $newContent = "'use client';" + "`r`n`r`n" + $content
    Set-Content $file.FullName -Value $newContent -NoNewline
    Write-Output "Added use client to $($file.Name)"
  } else {
    Write-Output "Already has use client: $($file.Name)"
  }
}

# Also handle hooks
$hookFiles = Get-ChildItem 'c:\Users\Starkizz Gadget\FLUTTER\sharpTableWebsite\hooks\*.ts'
foreach ($file in $hookFiles) {
  $content = Get-Content $file.FullName -Raw
  if ($content -notmatch "^'use client'") {
    $newContent = "'use client';" + "`r`n`r`n" + $content
    Set-Content $file.FullName -Value $newContent -NoNewline
    Write-Output "Added use client to $($file.Name)"
  } else {
    Write-Output "Already has use client: $($file.Name)"
  }
}
