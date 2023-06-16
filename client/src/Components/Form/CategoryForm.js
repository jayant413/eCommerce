import React from 'react'

const CategoryForm = ({handleSubmit , value , setValue}) => {

    return (
        <div>
            <form>
                <div className="mb-3">
            
                    <input type="email" className="form-control" placeholder="Enter new Category"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    />
                
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </form>

        </div>
    )
}

export default CategoryForm