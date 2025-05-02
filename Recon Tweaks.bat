@echo off
chcp 437 >nul 2>&1
powershell "& {Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('Recon is now Vone, Press "OK" To open Vone's website. ', 'Vone', 'Ok', [System.Windows.Forms.MessageBoxIcon]::Warning);}"
chcp 65001 >nul 2>&1
