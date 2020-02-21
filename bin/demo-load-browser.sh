for i in `seq 1 20`;
        do
                nohup bin/demo-load-browser2.sh $i &
		echo $i
        done    
