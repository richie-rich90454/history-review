package main

import(
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"os/signal"
	"path/filepath"
	"runtime"
	"syscall"
)

func main(){
	root, _:=os.Getwd()
	backendDir:=filepath.Join(root, "backend")
	frontendDir:=filepath.Join(root, "frontend")
	sig:=make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
	var backendCmd, frontendCmd *exec.Cmd
	if runtime.GOOS=="windows"{
		backendCmd=exec.Command("cmd", "/c", "mvnw.cmd", "spring-boot:run")
		frontendCmd=exec.Command("cmd", "/c", "npm.cmd", "run", "dev")
	}else{
		backendCmd=exec.Command("./mvnw", "spring-boot:run")
		frontendCmd=exec.Command("npm", "run", "dev")
	}
	backendCmd.Dir=backendDir
	frontendCmd.Dir=frontendDir
	backendCmd.Stdout=prefixWriter("BACKEND", os.Stdout)
	backendCmd.Stderr=prefixWriter("BACKEND", os.Stderr)
	frontendCmd.Stdout=prefixWriter("FRONTEND", os.Stdout)
	frontendCmd.Stderr=prefixWriter("FRONTEND", os.Stderr)
	if err:=backendCmd.Start(); err!=nil{
		fmt.Fprintf(os.Stderr, "Backend failed: %v\n", err)
		os.Exit(1)
	}
	if err:=frontendCmd.Start(); err!=nil{
		fmt.Fprintf(os.Stderr, "Frontend failed: %v\n", err)
		backendCmd.Process.Kill()
		os.Exit(1)
	}
	fmt.Println("Backend  running at http://localhost:8080")
	fmt.Println("Frontend running at http://localhost:5173")
	fmt.Println("Press Ctrl+C to stop.")
	go func(){
		<-sig
		fmt.Println("\nShutting down...")
		if backendCmd.Process!=nil{
			backendCmd.Process.Kill()
		}
		if frontendCmd.Process!=nil{
			frontendCmd.Process.Kill()
		}
		os.Exit(0)
	}()
	backendCmd.Wait()
	frontendCmd.Wait()
}
func prefixWriter(prefix string, out *os.File) *os.File{
	r, w, _:=os.Pipe()
	go func(){
		scanner:=bufio.NewScanner(r)
		for scanner.Scan(){
			fmt.Fprintf(out, "[%s] %s\n", prefix, scanner.Text())
		}
	}()
	return w
}